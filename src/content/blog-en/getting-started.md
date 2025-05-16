---
title: "Getting Started with Terminal Agent"
description: "This guide will introduce how to install and use Terminal Agent, helping you quickly get started with this powerful terminal DevOps assistant tool."
pubDate: "2025-05-09"
heroImage: "/images/getting-started.png"
author: "Terminal Agent Team"
readingTime: "8 minutes"
---

# Getting Started with Terminal Agent

Terminal Agent is a powerful terminal assistant tool that helps you interact with the terminal using natural language, performing system diagnostics, command translation, and automatic software installation. This guide will introduce how to install and use Terminal Agent, helping you quickly get started with this tool.

## Installing Terminal Agent

### Installation from Source Code

1. Clone the repository
```bash
git clone https://github.com/SagesAi/terminal-agent.git
cd terminal-agent
```

2. Install packages and dependencies
```bash
pip install -e .
```

3. Set API Keys
```bash
# Copy the example .env file to your config directory
mkdir -p ~/.terminal_agent
cp .env.example ~/.terminal_agent/.env

# Edit the .env file to add your API keys
# For example:
# OPENAI_API_KEY=your_api_key_here
# DEEPSEEK_API_KEY=your_api_key_here
# GOOGLE_API_KEY=your_api_key_here
# ANTHROPIC_API_KEY=your_api_key_here
```

## Basic Usage

### Running Terminal Agent

```bash
# If installed from source:
terminal-agent
```

### Example Use Cases

#### System Diagnostics
```
[Terminal Agent] > My system is running slow, can you help me diagnose the issue?
```

#### Command Translation
```
[Terminal Agent] > Find all files larger than 100MB in my home directory
```

#### Software Installation
```
[Terminal Agent] > Install Docker on my system
```

#### Specifying LLM Provider
```bash
# Using a specific provider
TERMINAL_AGENT_PROVIDER=gemini terminal-agent

# Using local model with Ollama
TERMINAL_AGENT_PROVIDER=ollama terminal-agent

# Using VLLM server
TERMINAL_AGENT_PROVIDER=vllm VLLM_API_BASE=http://localhost:8000 terminal-agent

# Or set in .env file
echo "TERMINAL_AGENT_PROVIDER=claude" >> ~/.terminal_agent/.env
```

## Using Local Models

Terminal Agent supports local LLM deployment via Ollama and VLLM, providing privacy and flexibility.

### Ollama Integration

[Ollama](https://ollama.com) allows you to run various open-source models on your local machine.

1. **Install Ollama:**
   - Download and install from [ollama.com](https://ollama.com)
   - Start Ollama service: `ollama serve`

2. **Pull models:**
   ```bash
   # Pull models (examples)
   ollama pull llama3
   ollama pull mistral
   ollama pull llama2
   ```

3. **Use with Terminal Agent:**
   ```bash
   # Use Ollama with Terminal Agent
   TERMINAL_AGENT_PROVIDER=ollama terminal-agent

   # Specify a specific model
   TERMINAL_AGENT_PROVIDER=ollama TERMINAL_AGENT_MODEL=mistral terminal-agent

   # Or configure in .env file
   echo "TERMINAL_AGENT_PROVIDER=ollama" >> ~/.terminal_agent/.env
   echo "TERMINAL_AGENT_MODEL=llama3" >> ~/.terminal_agent/.env
   ```

## Configuration Options

Terminal Agent can be configured via environment variables or a `.env` file:

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key | None |
| `DEEPSEEK_API_KEY` | DeepSeek API key | None |
| `GOOGLE_API_KEY` | Google Gemini API key | None |
| `ANTHROPIC_API_KEY` | Anthropic Claude API key | None |
| `TERMINAL_AGENT_PROVIDER` | Default LLM provider | `openai` |
| `TERMINAL_AGENT_MODEL` | Default model for provider | Provider-specific |
| `TERMINAL_AGENT_API_BASE` | Custom API base URL | Provider-specific |
| `OLLAMA_API_BASE` | Ollama API base URL | `http://localhost:11434` |
| `VLLM_API_BASE` | VLLM API base URL | `http://localhost:8000` |
| `VLLM_API_KEY` | VLLM API key (if needed) | None |

## Advanced Usage

Terminal Agent's modular architecture allows you to extend its functionality or customize its behavior. Check the `terminal_agent` directory in the source code for more information about its architecture and extension points.

We hope this guide helps you get started with Terminal Agent. If you have any questions or suggestions, please visit our [GitHub repository](https://github.com/SagesAi/terminal-agent).

## Basic Usage

### Running Terminal Agent

```bash
# If installed from source:
terminal-agent
```

### Example Use Cases

#### System Diagnostics
```
[Terminal Agent] > My system is running slow, can you help me diagnose the issue?
```

#### Command Translation
```
[Terminal Agent] > Find all files larger than 100MB in my home directory
```

#### Software Installation
```
[Terminal Agent] > Install Docker on my system
```

#### Specifying LLM Provider
```bash
# Using a specific provider
TERMINAL_AGENT_PROVIDER=gemini terminal-agent
```

## Advanced Features

### Custom Plugins

Terminal Agent supports custom plugins to extend its functionality:

```bash
# Install a plugin
terminal-agent --install-plugin github.com/user/terminal-agent-plugin

# Use a plugin
[Terminal Agent] > @plugin-name perform custom action
```

### Configuration

Terminal Agent can be configured through a configuration file:

```bash
# Create a default configuration
terminal-agent --init-config

# Edit configuration
nano ~/.config/terminal-agent/config.yaml
```

### API Integration

Terminal Agent can be integrated with other applications through its API:

```python
from terminal_agent import Agent

agent = Agent()
response = agent.query("Install nginx on my system")
print(response.actions)
```

## Troubleshooting

### Common Issues

1. **Authentication Errors**: Make sure your API keys are correctly set in the configuration file
2. **Network Issues**: Check your internet connection and proxy settings
3. **Permission Problems**: Some operations may require sudo privileges

### Getting Help

```bash
# View help
terminal-agent --help

# Check version
terminal-agent --version

# Enable debug mode
terminal-agent --debug
```

## Conclusion

Terminal Agent simplifies terminal interaction through natural language, making DevOps tasks more efficient and accessible. By following this guide, you should now be able to install and use Terminal Agent for various tasks.

For more information, visit the [official documentation](https://docs.terminal-agent.ai) or join our [community forum](https://community.terminal-agent.ai).
