export interface GameSeoContent {
  titleOverride?: string;
  description?: string;
  keywords?: string[];
  features?: string[];
  howTo?: string[]; // ordered steps
  faqs?: { q: string; a: string }[];
  overview?: string;
  story?: string;
  whyPlay?: string;
  tips?: string;
}

// Minimal but rich SEO copy per game. You can refine texts later.
export const gameSeoBySlug: Record<string, GameSeoContent> = {
  'last-seen-online': {
    titleOverride: 'Last Seen Online',
    description: 'A chat‑based browser horror experience you can play instantly in your browser. Best with sound on.',
    keywords: ['chat horror', 'browser horror', 'mystery'],
    features: ['Chat‑log storytelling', 'Multiple creepy endings', 'No install, play in browser'],
    howTo: ['Click Play to start the old computer', 'Read chat logs and clues carefully', 'Make choices to progress', 'Use headphones for best experience'],
    faqs: [
      { q: 'Is it free to play?', a: 'Yes, it is playable for free in your browser.' },
      { q: 'Do I need to download?', a: 'No download is needed. It runs in an iframe on this page.' }
    ],
    overview: 'Last Seen Online is a compact psychological horror told through chat logs, system prompts, and fragments of files left on a dusty hard drive. You are not given a weapon nor a map—only a screen, a cursor, and an unnerving sense that what you are reading has consequences. The interface mimics a late‑90s desktop, inviting you to poke around emails, pictures, and archived conversations. Every click feels invasive—and that is the point. The game excels at dread through implication: tiny details, timestamps, and responses that do not quite add up. Headphones amplify the tension with subtle tones and analog artifacts. Sessions are short, but the lingering questions will occupy your head long after you close the window.',
    story: 'You pick up an old computer at a garage sale and, like any good snoop, power it on before reformatting. What begins as idle curiosity turns into a voyeuristic descent into somebody else’s social life: messages with friends and strangers, sudden gaps in conversations, unexplained photos, and desperate pleas that were never answered. Threads cross and contradict; identities blur. The computer is both witness and accomplice, a black box where secrets were typed, deleted, then cached forever. As you trace relationships and locate missing pieces, the line between user and intruder erodes. You are not only reading the past—you are participating in it, choosing what to open, whom to believe, and when to stop. The final realization reframes every earlier click.',
    whyPlay: 'Play Last Seen Online if you enjoy slow‑burn, low‑fidelity horror that trusts your imagination. It is perfect for a single evening with headphones and dim lights: no tutorials, no fetch quests, only deliberate, unnerving discovery. The chat‑log format makes it uniquely accessible—readers of ARGs and fans of found‑footage stories will feel at home—yet it still delivers the adrenaline punch of a classic scare. It is also highly shareable: your interpretations and order of discovery can differ from your friends’, so post‑game discussion is half the fun. For creators and writers, the game is a masterclass in tension through interface design and negative space.',
    tips: 'Use headphones and keep brightness moderate to preserve contrast. Read carefully: dates, file names, and small UI states are narrative clues. Do not open everything immediately—follow one thread at a time to avoid missing context. If you feel stuck, step back to the desktop and look for recently modified items. Some choices are not labeled as choices; hovering or revisiting can reveal new prompts. Take notes of names and locations, then cross‑reference later. Most importantly, give yourself time between sections; the pacing works best when you let the implications sink in.'
  },
  'the-freak-circus': {
    titleOverride: 'The Freak Circus',
    description: 'Enter a disturbing circus and uncover its dark secrets. Play instantly online.',
    keywords: ['circus horror', 'web horror'],
    features: ['Short session horror', 'Stylized visuals', 'Works in the browser'],
    howTo: ['Press Play and follow on‑screen prompts', 'Explore areas and interact with props'],
    faqs: [{ q: 'Controller support?', a: 'Play with keyboard and mouse for best compatibility.' }],
    overview: 'The Freak Circus is a bite‑sized browser horror that transforms a familiar carnival aesthetic into something sickly and uncanny. Warm bulbs flicker; cotton candy hues curdle into bruise‑like purples. Instead of jump‑scares every minute, the game aims for mood: close‑up props, muffled crowd noise, and an uneasy ringmaster who never seems to blink. Its strength lies in exploration—short corridors and tents with just enough detail to suggest a larger world offscreen. Because it is web‑native, sessions are frictionless: you can launch, explore a thread, and be rattled within minutes. The result is a modern haunted attraction that lives inside your browser tab.',
    story: 'The circus arrived overnight, with no permits and no promotion—only flyers stapled to poles. When you slip under the canvas, the performers act as if they are waiting for you. A contortionist gestures toward a mirror maze that reflects not your body but your past mistakes. A fortune‑teller misreads your palm in ways that feel too specific to be random. Backstage, cages stand empty yet smell of wet straw. You collect fragments—tickets, scraps of posters, whispered warnings—and realize the circus feeds on attention. Audiences are not observers but ingredients. The exit is still where you left it, but the longer you linger, the more it feels like a trap designed to look like a party.',
    whyPlay: 'If you crave atmosphere over ammo, The Freak Circus delivers a stylish micro‑dose of dread. It respects your time—playable in a single sitting—yet gives you strong visual motifs worth remembering. Fans of carnival settings, analog horror, and liminal spaces will appreciate how each tent functions like a themed diorama. It is also a great introduction for friends who are “not into horror yet”: the tone is uncanny rather than gory, and the browser format reduces friction. Streamers and content creators will find plentiful screenshot moments and environmental storytelling to riff on.',
    tips: 'Explore methodically. Many props offer one‑time interactions that change later scenes. If a path seems closed, check the environment again after another event; the circus likes to rearrange itself. Keep sound on for directional cues—some attractions “call” to you when you are nearby. Read signage: misprints and reversed letters often foreshadow puzzles. When in doubt, follow the ring of distant applause; it usually leads to the next reveal. And remember: leaving is also a choice—some endings depend on how quickly you decide you have seen enough.'
  },
  'flesh-blood-concrete': {
    titleOverride: 'Flesh, Blood, & Concrete',
    description: 'Urban horror vignette playable on the web.',
    keywords: ['urban horror'],
    features: ['Short narrative', 'Moody soundtrack'],
    howTo: ['Click Play', 'Advance text and explore'],
    faqs: [],
    overview: 'Flesh, Blood, & Concrete is a moody urban nightmare about the way cities swallow people whole. Ambient drones and sodium‑orange lighting paint back alleys, stairwells, and empty subway cars with dread. Instead of monsters in plain sight, the danger feels infrastructural—concrete pillars that look too organic, vents that breathe, signage that changes wording when you are not looking. The controls are minimal, keeping your attention on tone and texture. Think of it as a night walk you probably should not have taken, rendered as a playable short story. It is ideal for players who enjoy literary horror, experimental cinema, or the aura of late‑night commutes that stretch too long.',
    story: 'You follow a familiar route after dark and realize the city does not recognize you back. Staircases descend farther than they should. A service corridor loops into your own building’s basement. In graffiti, a name appears that no one calls you anymore. The narrative suggests a larger history—missed calls, a move you never fully unpacked—without spelling it out, letting your imagination fill the gaps. The city acts like a living organism that wants to map you onto itself: your heartbeat syncs with the hum of transformers; crosswalk signals blink in patterns that feel like messages. By the time you reach the surface, you are unsure whether you escaped or became part of the grid.',
    whyPlay: 'Play this if you value atmosphere, metaphor, and immaculate sound design. The game is short yet layered, making it perfect for a reflective evening with headphones. It avoids cheap shock in favor of carefully controlled unease; as such, it appeals to fans of David Lynch, Junji Ito’s quiet panels, and urban exploration channels. It also rewards discussion—its ambiguous ending invites multiple readings about grief, displacement, and the way cities encode memory. For students of game design, it is a great study in how environment and audio can carry narrative weight with minimal mechanics.',
    tips: 'Lower your room lights and raise audio slightly; bass textures matter. Move slowly and look back occasionally—some environmental changes occur behind you. If you find recurring symbols, note where they appear; the pattern hints at route choices. Do not rush the text; line breaks are timed to build rhythm. When the world seems to repeat, try a deliberate detour rather than the “correct” path. The most effective way to play is in one sitting; momentum amplifies the ending’s aftertaste.'
  },
  'exhibit-of-sorrows': {
    titleOverride: 'Exhibit of Sorrows',
    description: 'A twisted interactive exhibit—simple controls, heavy atmosphere.',
    keywords: ['indie horror'],
    features: ['Short but intense', 'Interactive exhibit'],
    howTo: ['Start the exhibit', 'Interact with each display carefully'],
    faqs: [],
    overview: 'Exhibit of Sorrows masquerades as a cheerful hands‑on museum before revealing itself as a moral test disguised as a toy box. The premise is elegantly simple: each display invites you to push a button or turn a crank, and the exhibit responds with delight—until it does not. The playful UI, bright colors, and jaunty music set up a whiplash contrast with the cruelty that follows. The design shines in restraint: puzzles are intuitive, yet every interaction makes you complicit. You are not just solving; you are choosing to keep going. It is a perfect ten‑minute thriller that lingers far longer than many full‑length games.',
    story: 'A curator’s voice chirps instructions while exhibits perform tricks: inflate a balloon, wind a music box, watch a puppet smile. Slowly, the demands escalate. An exhibit “requires” more pressure; another “needs” you to repeat an action that becomes painful to witness. The cheery narration does not acknowledge the change, and your compliance becomes the real subject. By the final room, the museum’s theme is clear: the cost of entertainment and the stories we tell ourselves to excuse it. Whether you obey the final instruction or refuse, the ending reframes your earlier enthusiasm as participation.',
    whyPlay: 'Few browser games achieve this level of punch per minute. Exhibit of Sorrows is a masterclass in subversion—using accessible controls and friendly art to stage a gut‑punch about complicity. It is perfect for streaming, classroom discussions on ethics in interaction design, or anyone who thinks horror must be grimdark to be effective. It also runs on almost any device, making it an easy recommendation for friends. Most importantly, it leaves you with a specific, uncomfortable memory—something all great horror aims for.',
    tips: 'Play with sound on; the musical cues sell the tonal shift. Do not brute‑force displays—the exhibit wants you to notice when an instruction becomes unreasonable. If you feel uncomfortable, that is the design; sit with it for a moment before acting. Try both patience and impatience; timing can alter what you see. When the “fun” stops being fun, ask why you are still following orders—that reflection is part of the experience.'
  }
}; 