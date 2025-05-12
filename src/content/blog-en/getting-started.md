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

### Installation via pip

```bash
pip install terminal-agent
```

### Docker Installation

```bash
docker pull sagesai/terminal-agent:latest
docker run -it sagesai/terminal-agent
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
