"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronRight } from "lucide-react"

type Command = {
  input: string
  output: string[]
  isProcessing?: boolean
  isError?: boolean
}

export function CliAnimation() {
  const [commands, setCommands] = useState<Command[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Update the presetCommands to focus on tags instead of topics
  const presetCommands = [
    {
      input: "craft --help",
      output: [
        "CRAFT THE FUTURE CLI v1.0.0",
        "Available commands:",
        "  craft tags     - Browse content by tags",
        "  craft tools    - Launch Season 0 AI tools",
        "  craft feed     - Access the latest articles",
        "  craft search   - Search for specific content",
        "  craft subscribe - Subscribe to The Future Stack newsletter",
      ],
    },
    {
      input: "craft tags",
      output: [
        "Loading tags...",
        "Popular tags:",
        "→ devlogs (5 articles)",
        "→ ai (4 articles)",
        "→ tech (3 articles)",
        "→ building (2 articles)",
        "Type 'craft tag [name]' to view articles with a specific tag",
      ],
    },
    {
      input: "craft feed",
      output: [
        "Loading feed...",
        "Latest articles:",
        "→ Stop Shipping Alone: Why Devlogs Actually Matter",
        "→ Tech News Roundup · #2",
        "→ Devlog: Rebuilding the Backbone — AI Agent Overhaul",
      ],
    },
    {
      input: "craft search ai",
      output: [
        "Searching for 'ai'...",
        "Found 4 articles:",
        "→ Tech News Roundup · #2",
        "→ Devlog: Rebuilding the Backbone — AI Agent Overhaul",
        "→ Building a personal knowledge graph with embedded vectors",
        "→ Ethical frameworks for autonomous systems",
      ],
    },
    {
      input: "craft tools",
      output: [
        "🚀 Season 0 AI Tools - Now Live!",
        "Launch our suite of AI-powered creative tools:",
        "→ PostGen - Generate platform-specific content ideas",
        "→ MemeGen - Create viral meme captions", 
        "→ VibeScan - Analyze content tone & get rewrites",
        "→ HookGen - Generate engaging hooks in 25 tones",
        "Type 'craft tools [name]' to launch a specific tool",
      ],
    },
  ]

  // Simulate typing effect for command input
  useEffect(() => {
    if (currentCommandIndex >= presetCommands.length) return

    const command = presetCommands[currentCommandIndex]
    let charIndex = 0
    setIsTyping(true)

    const typingInterval = setInterval(() => {
      if (charIndex <= command.input.length) {
        setCurrentInput(command.input.substring(0, charIndex))
        charIndex++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)

        // Execute command after typing is complete
        setTimeout(() => {
          executeCommand(command.input)
        }, 500)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [currentCommandIndex])

  // Auto-scroll to bottom when new commands are added
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [commands])

  const executeCommand = (input: string) => {
    // Find the matching preset command
    const matchedCommand = presetCommands.find((cmd) => cmd.input === input)

    if (matchedCommand) {
      // First show the command with processing state
      setCommands((prev) => [...prev, { input, output: [], isProcessing: true }])

      // After a delay, show the output
      setTimeout(() => {
        setCommands((prev) =>
          prev.map((cmd, i) =>
            i === prev.length - 1 ? { input, output: matchedCommand.output, isProcessing: false } : cmd,
          ),
        )

        // Clear current input and prepare for next command
        setCurrentInput("")
        setTimeout(() => {
          setCurrentCommandIndex((prev) => prev + 1)
        }, 2000)
      }, 1000)
    }
  }

  // Restart animation when it completes
  useEffect(() => {
    if (currentCommandIndex >= presetCommands.length && commands.length > 0) {
      const timer = setTimeout(() => {
        setCommands([])
        setCurrentCommandIndex(0)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [currentCommandIndex, commands.length])

  // Add user input handling for a more interactive CLI experience
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentInput.trim() !== "") {
      executeCommand(currentInput.trim())
    }
  }

  return (
    <div className="w-full border border-black bg-black text-green-400 font-mono text-sm md:text-base rounded-none overflow-hidden">
      <div className="flex items-center px-4 py-2 bg-gray-900 border-b border-gray-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-gray-300">craft-terminal</div>
      </div>

      <div ref={containerRef} className="p-4 h-64 md:h-80 overflow-y-auto" style={{ scrollBehavior: "smooth" }}>
        {/* Welcome message */}
        <div className="mb-4">
          <p>Welcome to CRAFT THE FUTURE - A story-forward content studio</p>
          <p className="text-gray-500">Type or watch commands to explore our content</p>
        </div>

        {/* Previous commands and outputs */}
        {commands.map((command, i) => (
          <div key={i} className="mb-4">
            <div className="flex items-center">
              <span className="text-green-600 mr-2">
                <ChevronRight size={16} />
              </span>
              <span>{command.input}</span>
            </div>

            {command.isProcessing ? (
              <div className="ml-4 mt-1">
                <div className="inline-block w-4 h-4 border-t-2 border-green-400 rounded-full animate-spin"></div>
                <span className="ml-2">Processing...</span>
              </div>
            ) : (
              <div className="ml-4 mt-1">
                {command.output.map((line, j) => (
                  <div key={j} className={`${j === 0 ? "text-gray-400" : ""}`}>
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Current command being typed or input field */}
        <div className="flex items-center mt-2">
          <span className="text-green-600 mr-2">
            <ChevronRight size={16} />
          </span>
          <input
            type="text"
            className="bg-black text-green-400 outline-none border-none flex-1"
            value={currentInput}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            autoFocus
            spellCheck={false}
            style={{ caretColor: '#22c55e' }}
            placeholder={isTyping ? '' : 'Type a command...'}
            disabled={isTyping}
          />
          {isTyping && <span className="ml-1 animate-pulse">|</span>}
        </div>
      </div>
    </div>
  )
}
