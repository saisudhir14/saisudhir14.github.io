---
title: "Dictionary"
description: "Words I use with agents. AI coding is the first group. More groups will be added, including voice."
---

This is my list of words I want pinned down. It will grow. The note under each word is mine. When a word shows up in a real session, I will add a date and what happened.

AI coding is the first group. Those definitions follow [The AI Coding Dictionary](https://www.aicodingdictionary.com/). Later groups will cover other work, including voice agents.

I wrote a short note on why I started in [Starting a Dictionary](/blog/learning-the-ai-coding-dictionary/).

## AI coding

71 words. The short definition follows [The AI Coding Dictionary](https://www.aicodingdictionary.com/).

### The model

16 words about the weights, what a request costs, and how the next token gets picked.

**AI.** A loose name that keeps moving. It points at whatever computers can newly do well. Right now that is large language models.

*Not written yet.*

**Model.** The parameters. It keeps nothing between requests. All it does is next-token prediction, and it cannot take an action on its own.

*Not written yet.*

**Parameters.** The numbers inside a model, often billions, set during training. Also called weights.

*Not written yet.*

**Training.** How those parameters get set. The model is shown a huge amount of text and adjusted so the next token comes out better.

*Not written yet.*

**Inference.** Running a trained model so it produces output. The parameters stay fixed.

*Not written yet.*

**Next-token prediction.** What the model actually does. It samples one next token from the context, appends it, and runs again.

*Not written yet.*

**Token.** The unit a model reads and writes. Roughly the size of a word, with uneven splits. Context size, cost, and latency are all counted in tokens.

*Not written yet.*

**Input tokens.** Tokens the harness sends on each request. They cost less than output tokens.

*Not written yet.*

**Output tokens.** Tokens the model sends back. They cost more, because producing them takes more compute.

*Not written yet.*

**Model provider.** Whatever runs a model for inference. A remote API such as Anthropic, OpenAI, or Google, or a local runner such as Ollama or llama.cpp.

*Not written yet.*

**Model provider request.** One round trip. The harness sends context. The provider returns one response.

*Not written yet.*

**Non-determinism.** The same input can come back different. This comes from how the model samples text, and from how the provider serves the request.

*Not written yet.*

**Prefix cache.** A store on the provider. When the start of a new request matches an earlier one, the provider can skip reprocessing that shared prefix.

*Not written yet.*

**Cache tokens.** Input tokens read from the prefix cache. They are billed at a much lower rate.

*Not written yet.*

**Effort.** A setting for how much reasoning the model does before it answers. More effort spends more output tokens, which helps on harder problems.

*Not written yet.*

**Harness.** The software around the model that makes it an agent: tools, the system prompt, context handling, permissions, and hooks.

*Not written yet.*

### Sessions, context, and turns

8 words about what the model can see, and where a conversation starts and stops.

**Agent.** A model placed in a harness, with tools, a system prompt, and a context window, taking turns with a person.

*Not written yet.*

**System prompt.** The standing instructions the harness puts at the front of every request. They usually stay the same for a whole session.

*Not written yet.*

**Context window.** Everything the model can see on one request. The size is finite, and it depends on the model.

*Not written yet.*

**Context.** The information the agent has right now that matters for the task.

*Not written yet.*

**Turn.** One user message, plus everything the agent does until it hands control back. One turn can contain more than one provider request.

*Not written yet.*

**Session.** One bounded run with an agent. It starts empty, it fills up, and it ends when you clear it, close it, or compact it into a fresh session.

*Not written yet.*

**Stateless.** Nothing carries forward. The model is stateless across requests. An agent is stateless across sessions unless a memory system is added.

*Not written yet.*

**Stateful.** Information carries forward. A session is stateful across turns. A memory system can make an agent stateful across sessions.

*Not written yet.*

### Tools and environment

10 words about how the agent looks at the world and changes it.

**Tool.** A function the harness exposes for the agent to call, such as Read, Write, Bash, or Search. This is how an agent sees the environment and acts on it.

*Not written yet.*

**Tool call.** Text from the model that names a tool and its arguments. The harness has to read that text and run the tool.

*Not written yet.*

**Tool result.** What the harness sends back after a tool call: file contents, command output, or an error. This is the only view the agent gets of the environment.

*Not written yet.*

**Environment.** The world outside the harness. The agent sees it through tool results and changes it through tool calls.

*Not written yet.*

**Filesystem.** The tree of files and directories the agent reads, writes, and runs commands in. For a coding agent, this is the usual environment.

*Not written yet.*

**MCP.** A protocol for plugging external tool servers into a harness, past the tools the harness already ships with.

*Not written yet.*

**Sandbox.** An isolated place the agent runs in: a container, a VM, or a restricted shell. It limits how far one action can reach.

*Not written yet.*

**Agent mode.** A preset that bundles a permission mode with extra instructions injected into the system prompt. It can be switched during a session.

*Not written yet.*

**Permission mode.** The slice of an agent mode that decides which tool calls need approval and which run on their own.

*Not written yet.*

**Permission request.** What the harness shows you before it runs a tool call that is not already approved.

*Not written yet.*

### Failure modes

9 words about a session getting worse, and about the model being sure and wrong.

**Parametric knowledge.** What the model knows from training, stored in its parameters. It is frozen at training time.

*Not written yet.*

**Contextual knowledge.** Facts the agent can read directly from the context it has right now.

*Not written yet.*

**Knowledge cutoff.** The date after which the model has no parametric knowledge. Libraries and APIs from after that date are easy for it to invent, unless the docs are loaded into context.

*Not written yet.*

**Hallucination.** Output stated with confidence when it is wrong. One kind is invented facts. The other is drift away from context that was already loaded.

*Not written yet.*

**Sycophancy.** Agreeable output, stated with confidence. Training pushed the model toward answers people liked, and agreement was one of those answers.

*Not written yet.*

**Attention relationship.** The pairing between two tokens. Pairs that mean something influence each other more than unrelated pairs. A context of N tokens has about N squared of these pairings.

*Not written yet.*

**Attention budget.** Each token has a finite amount of influence to spread across the rest of the context. The budget does not grow when the context gets longer.

*Not written yet.*

**Attention degradation.** As a session grows, each token's attention budget is spread across more tokens, so the signal on the pairings that matter gets weaker.

*Not written yet.*

**Smart zone.** Early in a session the agent is sharp and stays on the task. As the session grows it gets sloppier, forgets earlier details, and makes more mistakes.

*Not written yet.*

### Handoffs

9 words about moving work from one session to the next.

**Handoff.** Transferring what the agent knows from one session to another. There is no path back.

*Not written yet.*

**Handoff artifact.** A document one session writes for another session to read.

*Not written yet.*

**Clearing.** Ending the current session and starting a fresh one. The next message begins with an empty session and an empty context window.

*Not written yet.*

**Compaction.** A handoff done in memory. The previous session is summarized, and that summary seeds a new session. Detail is traded for room in the window.

*Not written yet.*

**Autocompact.** Compaction the harness starts on its own when the context window is close to full.

*Not written yet.*

**Primary source.** The thing itself: code, a transcript, raw data. It is complete, and it is expensive to load into context.

*Not written yet.*

**Secondary source.** An account of a primary source, one step removed: a summary, docs, or a compaction summary. It is cheap to load, and it leaves detail out.

*Not written yet.*

**Spec.** A handoff artifact for work that spans several sessions. It says what is being built. It is made of tickets.

*Not written yet.*

**Ticket.** A handoff artifact that scopes one session of work. It can stand alone, or it can hang off a spec. It can block sibling tickets, and sibling tickets can block it.

*Not written yet.*

### Memory and steering

6 words about keeping the agent on the right context from one session to the next.

**AGENTS.md.** A file in the project that the harness loads into the context window at the start of a session. It is the project's standing brief to the agent.

*Not written yet.*

**Memory system.** A setup that tries to make an agent stateful across sessions. It writes state into the environment and loads that state again when the next session starts.

*Not written yet.*

**Skill.** A teachable capability bundled as one unit. It stays out of the context window until a context pointer pulls it in for the task at hand.

*Not written yet.*

**Context pointer.** A mention in one document that points at another document. The agent can pull the second document into context only when the task needs it.

*Not written yet.*

**Progressive disclosure.** Loading only the context an agent needs right now, and leaving context pointers to the rest. The idea is borrowed from UI design.

*Not written yet.*

**Subagent.** An agent started by another agent through a tool call. It runs in its own session, reports a single tool result, and cannot start further subagents.

*Not written yet.*

### Patterns of work

13 words about how a person and an agent split the job.

**DX.** Developer experience: how easy a codebase and its toolchain are for a person. Docs, feedback speed, and error messages.

*Not written yet.*

**AX.** Agent experience: how well the environment is set up for an agent to do good work. Checks, code structure, and free context.

*Not written yet.*

**Human-in-the-loop.** A way of working where one or more people stay in the session with the agent, reviewing, redirecting, or building alongside it.

*Not written yet.*

**AFK.** A way of working where you start a session and leave it running. Away from keyboard.

*Not written yet.*

**Human review.** You read the code the agent produced and judge it. Reading the diff counts. Reading the summary does not.

*Not written yet.*

**Vibe coding.** A way of working where you accept the agent's code without human review. The diff is left unread.

*Not written yet.*

**Automated check.** A deterministic check that runs in the environment: tests, type checks, lint, the build, pre-commit hooks. It passes or it fails. It does not form a judgment.

*Not written yet.*

**Automated review.** An agent reviewing another agent's work, often with a different model or a different system prompt. It forms a judgment, so the result can change from run to run.

*Not written yet.*

**Design concept.** The shared understanding of what is being built, held by you and the agent, separate from any file or other asset.

*Not written yet.*

**Grilling.** A way to develop a design concept. The agent interviews you, one decision at a time.

*Not written yet.*

**Prototyping.** Having the agent build a quick, rough version when a conversation is too vague and you need something real to look at.

*Not written yet.*

**Software factory.** A way of working where triggers start agent sessions, so more of the work runs AFK. Your time stays on the parts that need you.

*Not written yet.*

**Dark factory.** A codebase, or part of one, where a software factory writes the code and no person reviews it.

*Not written yet.*

## Voice agents

Nothing here yet. I will add terms as I work through the voice agents I build.
