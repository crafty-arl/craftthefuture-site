"use client"

import type React from "react"

import { useState, useEffect, useRef, type KeyboardEvent } from "react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

type CommandOutput = {
  text: string
  isLink?: boolean
  href?: string
}

type Command = {
  input: string
  output: CommandOutput[]
  isProcessing?: boolean
  isError?: boolean
}

export function InteractiveCli() {
  const [commands, setCommands] = useState<Command[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new commands are added
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [commands])

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value)
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentInput.trim() && !isProcessing) {
      executeCommand(currentInput)
    }
  }

  const executeCommand = (input: string) => {
    const trimmedInput = input.trim().toLowerCase()
    // Require 'craft' prefix for all commands
    if (!trimmedInput.startsWith('craft')) {
      setCommands((prev) => [...prev, {
        input: trimmedInput,
        output: [
          { text: "All commands must start with 'craft'. Try 'craft help' for available commands." }
        ],
        isProcessing: false,
        isError: true
      }])
      setIsProcessing(false)
      return
    }
    // Remove 'craft' prefix for command matching
    const commandBody = trimmedInput.replace(/^craft\s*/, "")
    setIsProcessing(true)

    // Add command to history with processing state
    setCommands((prev) => [...prev, { input: trimmedInput, output: [], isProcessing: true }])
    setCurrentInput("")

    // Process command after a short delay to show loading state
    setTimeout(() => {
      let commandOutput: CommandOutput[] = []
      let isError = false

      // Command processing logic
      if (commandBody === "help" || commandBody === "--help" || commandBody === "--help") {
        commandOutput = [
          { text: "CRAFT THE FUTURE CLI v1.0.0" },
          { text: "Available commands:" },
          { text: "  craft help       - Show this help message" },
          { text: "  craft build      - Access technical insights and devlogs" },
          { text: "  craft govern     - Explore systems and ethics content" },
          { text: "  craft dream      - Discover stories and speculative visions" },
          { text: "  craft tools      - Launch Season 0 AI tools" },
          { text: "  craft subscribe  - Subscribe to The Future Stack newsletter" },
          { text: "  craft clear      - Clear the terminal" },
          { text: "  craft feed       - Browse the content feed", isLink: true, href: "/feed" },
        ]
      } else if (commandBody === "build") {
        commandOutput = [
          { text: "Loading /build content..." },
          { text: "Technical insights and devlogs for builders:" },
          {
            text: "→ Stop Shipping Alone: Why Devlogs Actually Matter",
            isLink: true,
            href: "/post/stop-shipping-alone-why-devlogs-actually-matter",
          },
          {
            text: "→ Devlog: Rebuilding the Backbone — AI Agent Overhaul",
            isLink: true,
            href: "/post/devlog-rebuilding-the-backbone-ai-agent-overhaul",
          },
          {
            text: "→ Shipping Signal: Building a Builder-First Hacker News Digest",
            isLink: true,
            href: "/post/shipping-signal-building-a-builder-first-hacker-news-digest",
          },
          { text: "Type 'craft topics' to see all /build topics" },
        ]
      } else if (commandBody === "govern") {
        commandOutput = [
          { text: "Loading /govern content..." },
          { text: "Systems and ethics for shapers:" },
          {
            text: "→ When Encryption 'Works' — And Still Breaks",
            isLink: true,
            href: "/post/when-encryption-works-and-still-breaks",
          },
          {
            text: "→ Uyghur Surveillance Campaign: A Tech Ethics Case Study",
            isLink: true,
            href: "/post/uyghur-surveillance-campaign-tech-ethics-case-study",
          },
          {
            text: "→ Digital Seams: The Human Side of Security",
            isLink: true,
            href: "/post/digital-seams-the-human-side-of-security",
          },
          { text: "Type 'craft topics' to see all /govern topics" },
        ]
      } else if (commandBody === "dream") {
        commandOutput = [
          { text: "Loading /dream content..." },
          { text: "Stories and visions for architects:" },
          {
            text: "→ Tools, tricks, and tech that punch above their weight",
            isLink: true,
            href: "/post/tools-tricks-and-tech-that-punch-above-their-weight",
          },
          {
            text: "→ Tech News Roundup #2: The Edge Cases",
            isLink: true,
            href: "/post/tech-news-roundup-2-the-edge-cases",
          },
          {
            text: "→ AI Agents: Not Just a Demo Anymore",
            isLink: true,
            href: "/post/ai-agents-not-just-a-demo-anymore",
          },
          { text: "Type 'craft topics' to see all /dream topics" },
        ]
      } else if (commandBody === "tools") {
        commandOutput = [
          { text: "🚀 Season 0 AI Tools - Now Live!" },
          { text: "Launch our suite of AI-powered creative tools:" },
          {
            text: "→ PostGen - Generate platform-specific content ideas",
            isLink: true,
            href: "https://postgen.craftthefuture.xyz",
          },
          {
            text: "→ MemeGen - Create viral meme captions",
            isLink: true,
            href: "https://memegen.craftthefuture.xyz",
          },
          {
            text: "→ VibeScan - Analyze content tone & get rewrites",
            isLink: true,
            href: "https://vibescan.craftthefuture.xyz",
          },
          {
            text: "→ HookGen - Generate engaging hooks in 25 tones",
            isLink: true,
            href: "https://hookgen.craftthefuture.xyz",
          },
          { text: "Type 'craft tools [name]' to launch a specific tool" },
          { text: "Or visit the Season 0 page", isLink: true, href: "/season-0" },
        ]
      } else if (commandBody.startsWith("tools ")) {
        const toolName = commandBody.substring(6).toLowerCase().trim()
        const tools = {
          "postgen": { name: "PostGen", url: "https://postgen.craftthefuture.xyz", description: "Content ideas generator" },
          "memegen": { name: "MemeGen", url: "https://memegen.craftthefuture.xyz", description: "Meme caption generator" },
          "vibescan": { name: "VibeScan", url: "https://vibescan.craftthefuture.xyz", description: "Tone analysis tool" },
          "hookgen": { name: "HookGen", url: "https://hookgen.craftthefuture.xyz", description: "Hook generator" },
        }
        
        const tool = tools[toolName as keyof typeof tools]
        if (tool) {
          commandOutput = [
            { text: `🚀 Launching ${tool.name}...` },
            { text: tool.description },
            {
              text: `→ Open ${tool.name}`,
              isLink: true,
              href: tool.url,
            },
            { text: "Tool will open in a new tab" },
          ]
        } else {
          commandOutput = [
            { text: `Tool "${toolName}" not found.` },
            { text: "Available tools: postgen, memegen, vibescan, hookgen" },
            { text: "Type 'craft tools' to see all tools" },
          ]
          isError = true
        }
      } else if (commandBody === "subscribe") {
        commandOutput = [
          { text: "Opening subscription options..." },
          { text: "Subscribe to The Future Stack newsletter:" },
          {
            text: "→ Click here to subscribe via Substack",
            isLink: true,
            href: "https://craftthefuture.substack.com",
          },
          { text: "Weekly drops featuring content from /build, /govern, and /dream" },
        ]
      } else if (commandBody === "topics") {
        commandOutput = [
          { text: "Available topics:" },
          { text: "/build:" },
          { text: "  - Automation, Local AI, Code + Culture, Developer Tools, Technical Walkthroughs" },
          { text: "/govern:" },
          { text: "  - Civic Tech, Ethical AI, Policy Reform, Digital Governance, System Design" },
          { text: "/dream:" },
          { text: "  - Speculative Fiction, Visual Essays, Poetry, Worldbuilding, Radical Narratives" },
          {
            text: "→ Browse all topics",
            isLink: true,
            href: "/topics",
          },
        ]
      } else if (commandBody === "feed") {
        commandOutput = [
          { text: "Opening feed browser..." },
          { text: "The feed browser allows you to explore our latest content." },
          {
            text: "→ Go to feed browser",
            isLink: true,
            href: "/feed",
          },
        ]
      } else if (commandBody === "tags") {
        commandOutput = [
          { text: "Loading tags..." },
          { text: "Popular tags:" },
          {
            text: "→ devlogs (8 articles)",
            isLink: true,
            href: "/tag/devlogs",
          },
          {
            text: "→ ai (6 articles)",
            isLink: true,
            href: "/tag/ai",
          },
          {
            text: "→ tech (5 articles)",
            isLink: true,
            href: "/tag/tech",
          },
          {
            text: "→ building (4 articles)",
            isLink: true,
            href: "/tag/building",
          },
          {
            text: "→ tools (3 articles)",
            isLink: true,
            href: "/tag/tools",
          },
          { text: "Type 'craft tag [name]' to view articles with a specific tag" },
        ]
      } else if (commandBody.startsWith("tag ")) {
        const tag = commandBody.substring(4).trim()

        commandOutput = [
          { text: `Loading articles with tag '${tag}'...` },
          { text: "Articles:" },
          {
            text: "→ View all articles with this tag",
            isLink: true,
            href: `/tag/${tag}`,
          },
        ]
      } else if (commandBody === "clear" || commandBody === "cls") {
        setCommands([])
        setIsProcessing(false)
        return
      } else {
        commandOutput = [
          { text: `Command not found: ${trimmedInput}` },
          { text: "Type 'craft help' to see available commands" },
        ]
        isError = true
      }

      // Update command history with output
      setCommands((prev) =>
        prev.map((cmd, i) =>
          i === prev.length - 1 ? { input: trimmedInput, output: commandOutput, isProcessing: false, isError } : cmd,
        ),
      )

      setIsProcessing(false)

      // Focus input after command execution
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 800)
  }

  return (
    <div className="w-full border border-black bg-black text-green-400 font-mono text-sm md:text-base rounded-none overflow-hidden">
      <div className="flex items-center px-4 py-2 bg-gray-900 border-b border-gray-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-gray-300">craft-terminal ~ interactive</div>
      </div>

      <div ref={containerRef} className="p-4 h-64 md:h-80 overflow-y-auto" style={{ scrollBehavior: "smooth" }}>
        {/* Welcome message */}
        <div className="mb-4">
          <p>Welcome to CRAFT THE FUTURE - A story-forward content studio</p>
          <p className="text-gray-500">Type 'help' to see available commands</p>
        </div>

        {/* Command history */}
        {commands.map((command, i) => (
          <div key={i} className="mb-4">
            <div className="flex items-center">
              <span className="text-green-600 mr-2">
                <ChevronRight size={16} />
              </span>
              <span className={command.isError ? "text-red-400" : ""}>{command.input}</span>
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
                    {line.isLink ? (
                      <Link
                        href={line.href || "#"}
                        className="text-green-300 hover:underline"
                        target={line.href?.startsWith("http") ? "_blank" : undefined}
                        rel={line.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {line.text}
                      </Link>
                    ) : (
                      line.text
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Current command input */}
        <div className="flex items-center">
          <span className="text-green-600 mr-2">
            <ChevronRight size={16} />
          </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            className="bg-transparent border-none outline-none text-green-400 w-full"
            placeholder={isProcessing ? "Processing..." : "Type a command..."}
            disabled={isProcessing}
            aria-label="Command input"
          />
        </div>
      </div>
    </div>
  )
}
