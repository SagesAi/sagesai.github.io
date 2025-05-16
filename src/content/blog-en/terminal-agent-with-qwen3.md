---
title: "Terminal Agent + Qwen3 Practice Guide"
description: "Learn how to use Terminal Agent with locally deployed Qwen3-14b model"
pubDate: "2025-05-16"
heroImage: "/images/terminal_agent_qwen3.png"
author: "Terminal Agent Team"
readingTime: "10 minutes"
---

# Terminal Agent + Qwen3 Practice Guide

This article introduces how to use Terminal Agent with the Qwen3-14b model deployed locally using vLLM. The specific contents are as follows:

1. How to download the Qwen3-14b model
2. How to deploy Qwen3-14b using vLLM
3. How to configure Terminal Agent environment variables
4. Demo video
5. Usage examples

## 1. Download Qwen3-14b Model

Qwen3-14B is a high-performance large language model open-sourced by Alibaba Cloud, which can be downloaded through Hugging Face or official channels.

- Hugging Face: [Qwen/Qwen3-14B](https://huggingface.co/Qwen/Qwen3-14B)
- Official documentation: [Qwen Official Documentation](https://github.com/QwenLM/Qwen3)

Example download command:

```bash
huggingface-cli download Qwen3/Qwen3-14B --local-dir /mnt/models/qwen3
```

## 2. Deploy Qwen3-14b Using vLLM

[vLLM](https://github.com/vllm-project/vllm) is a high-performance inference engine that supports efficient deployment of large models. It significantly improves model inference performance through continuous batch processing, PagedAttention, and other technologies.

### Install vLLM

It is recommended to create an independent environment using conda or virtualenv:

```bash
# Create virtual environment
python -m venv vllm-env
source vllm-env/bin/activate  # Linux/Mac
# or vllm-env\Scripts\activate  # Windows

# Install vLLM
pip install "vllm>=0.8.5"
```

### Start vLLM Service

Assuming the model has been downloaded to `mnt/models/Qwen3-14B`, you can start the API service with the following command. Additionally, we'll disable the thinking feature of Qwen3 to improve speed. In this example, we're using an environment with 4 T4 GPUs, so we set the tensor parallelism to 4:

```bash
vllm serve /mnt/models/qwen3-14b --served-model-name qwen3 --tensor-parallel-size=4 --chat-template ./qwen3_nonthinking.jinja
```

The content of qwen3_nonthinking.jinja is as follows:

```bash
{%- if tools %}
    {{- '<|im_start|>system\n' }}
    {%- if messages[0].role == 'system' %}
        {{- messages[0].content + '\n\n' }}
    {%- endif %}
    {{- "# Tools\n\nYou may call one or more functions to assist with the user query.\n\nYou are provided with function signatures within <tools></tools> XML tags:\n<tools>" }}
    {%- for tool in tools %}
        {{- "\n" }}
        {{- tool | tojson }}
    {%- endfor %}
    {{- "\n</tools>\n\nFor each function call, return a json object with function name and arguments within <tool_call></tool_call> XML tags:\n<tool_call>\n{\"name\": <function-name>, \"arguments\": <args-json-object>}\n</tool_call><|im_end|>\n" }}
{%- else %}
    {%- if messages[0].role == 'system' %}
        {{- '<|im_start|>system\n' + messages[0].content + '<|im_end|>\n' }}
    {%- endif %}
{%- endif %}
{%- set ns = namespace(multi_step_tool=true, last_query_index=messages|length - 1) %}
{%- for message in messages[::-1] %}
    {%- set index = (messages|length - 1) - loop.index0 %}
    {%- if ns.multi_step_tool and message.role == "user" and not(message.content.startswith('<tool_response>') and message.content.endswith('</tool_response>')) %}
        {%- set ns.multi_step_tool = false %}
        {%- set ns.last_query_index = index %}
    {%- endif %}
{%- endfor %}
{%- for message in messages %}
    {%- if (message.role == "user") or (message.role == "system" and not loop.first) %}
        {{- '<|im_start|>' + message.role + '\n' + message.content + '<|im_end|>' + '\n' }}
    {%- elif message.role == "assistant" %}
        {%- set content = message.content %}
        {%- set reasoning_content = '' %}
        {%- if message.reasoning_content is defined and message.reasoning_content is not none %}
            {%- set reasoning_content = message.reasoning_content %}
        {%- else %}
            {%- if '</think>' in message.content %}
                {%- set content = message.content.split('</think>')[-1].lstrip('\n') %}
                {%- set reasoning_content = message.content.split('</think>')[0].rstrip('\n').split('<think>')[-1].lstrip('\n') %}
            {%- endif %}
        {%- endif %}
        {%- if loop.index0 > ns.last_query_index %}
            {%- if loop.last or (not loop.last and reasoning_content) %}
                {{- '<|im_start|>' + message.role + '\n<think>\n' + reasoning_content.strip('\n') + '\n</think>\n\n' + content.lstrip('\n') }}
            {%- else %}
                {{- '<|im_start|>' + message.role + '\n' + content }}
            {%- endif %}
        {%- else %}
            {{- '<|im_start|>' + message.role + '\n' + content }}
        {%- endif %}
        {%- if message.tool_calls %}
            {%- for tool_call in message.tool_calls %}
                {%- if (loop.first and content) or (not loop.first) %}
                    {{- '\n' }}
                {%- endif %}
                {%- if tool_call.function %}
                    {%- set tool_call = tool_call.function %}
                {%- endif %}
                {{- '<tool_call>\n{"name": "' }}
                {{- tool_call.name }}
                {{- '", "arguments": ' }}
                {%- if tool_call.arguments is string %}
                    {{- tool_call.arguments }}
                {%- else %}
                    {{- tool_call.arguments | tojson }}
                {%- endif %}
                {{- '}\n</tool_call>' }}
            {%- endfor %}
        {%- endif %}
        {{- '<|im_end|>\n' }}
    {%- elif message.role == "tool" %}
        {%- if loop.first or (messages[loop.index0 - 1].role != "tool") %}
            {{- '<|im_start|>user' }}
        {%- endif %}
        {{- '\n<tool_response>\n' }}
        {{- message.content }}
        {{- '\n</tool_response>' }}
        {%- if loop.last or (messages[loop.index0 + 1].role != "tool") %}
            {{- '<|im_end|>\n' }}
        {%- endif %}
    {%- endif %}
{%- endfor %}
{%- if add_generation_prompt %}
    {{- '<|im_start|>assistant\n<think>\n\n</think>\n\n' }}
{%- endif %}
```

Parameter descriptions:
- `--tensor-parallel-size`: Number of GPUs to use
- `--chat-template`: Chat template used by the model
- `--served-model-name`: Model name for external service

For multi-card deployment or more parameters, please refer to the [vLLM official documentation](https://vllm.readthedocs.io/en/latest/).

## 3. Configure Terminal Agent Environment Variables

In the Terminal Agent runtime environment, set the following environment variables to connect to the local vLLM service and Qwen3-14b model:

```env
# Use vLLM as the model provider
TERMINAL_AGENT_PROVIDER=vllm

# Set vLLM API address
VLLM_API_BASE=http://localhost:8000

# Optional: Set default model name
TERMINAL_AGENT_MODEL=qwen3

# Optional: Set API key (if authentication is configured)
# VLLM_API_KEY=your_api_key_here
```

You can set these environment variables in the following ways:

1. **Directly in the command line** (temporary):

```bash
export TERMINAL_AGENT_PROVIDER=vllm
export VLLM_API_BASE=http://localhost:8000
```

2. **Add to the `~/.terminal_agent/.env` file** (permanent):

```bash
# Create or edit configuration file
mkdir -p ~/.terminal_agent
echo "TERMINAL_AGENT_PROVIDER=vllm" >> ~/.terminal_agent/.env
echo "VLLM_API_BASE=http://localhost:8000" >> ~/.terminal_agent/.env
echo "TERMINAL_AGENT_MODEL=qwen3" >> ~/.terminal_agent/.env
```

## 4. Start Terminal Agent

Now you can start Terminal Agent and begin using the Qwen3 model:

```bash
terminal-agent
```

After starting, you should see output similar to the following:

```
[Terminal Agent] Connected to local vLLM service
[Terminal Agent] Using model: Qwen3
[Terminal Agent] > 
```

## 5. Usage Examples

For demonstration, please watch the video below:

<iframe width="560" height="315" src="https://www.youtube.com/embed/DWQJ3tw7RF4" title="Terminal Agent with Qwen3 Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

This video demonstrates how Terminal Agent works with locally deployed Qwen3-14B model to provide fast and efficient terminal assistance.

If you have any questions, feel free to open an Issue on [GitHub](https://github.com/SagesAi/terminal-agent) for discussion.