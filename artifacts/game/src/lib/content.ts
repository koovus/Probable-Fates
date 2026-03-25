export type StatKey = 'funding' | 'compute' | 'talent' | 'safety' | 'hype' | 'openness' | 'missionDrift' | 'boardTension' | 'msInfluence' | 'rivalPressure';

export interface Choice {
  label: string;
  deltas: Partial<Record<StatKey, number>>;
  flags?: string[];
  outcome: string;
}

export interface Milestone {
  year: number;
  title: string;
  narrative: string;
  choices: Choice[];
}

export interface EventDef {
  id: string;
  headline: string;
  body: string;
  choices: Choice[];
  theme?: 'gossip' | 'paranoia' | 'standard';
  persona?: ('safety' | 'hustler' | 'opensrc')[];
}

export interface Ending {
  id: string;
  title: string;
  desc: string;
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  desc: string;
}

export const MILESTONES: Milestone[] = [
  {
    year: 2015,
    title: "The Founding",
    narrative: "It's December 2015. A ragtag group of the smartest people in tech are gathering in a San Francisco conference room. The idea: create an AI research lab that puts humanity first — a nonprofit. No shareholders, no profit motive. Just pure, beautiful, terrifying science.\n\nElon Musk is pacing. Greg Brockman is taking notes. You're deciding what kind of organization this will be before the ink is dry. Oh, and you need $1 billion in commitments by Friday. No pressure.",
    choices: [
      { label: "Pure Nonprofit Forever", deltas: { safety: 20, funding: -15, openness: 10 }, flags: ['pure_nonprofit'], outcome: "Purity achieved. Fundraising is... challenging. Virtue is its own reward, you tell yourself, as you eat rice cakes at the office." },
      { label: "Nonprofit Now, Flexible Later", deltas: { safety: 5, funding: 10 }, flags: ['flexible_structure'], outcome: "Pragmatism wins. The lawyers are already drafting amendment clauses. The alignment researchers look suspicious." },
      { label: "Invite Musk Fully — Give Him Board Control", deltas: { funding: 25, talent: 10, boardTension: 20 }, flags: ['musk_control'], outcome: "Elon is ecstatic. He immediately suggests renaming the lab 'xOpenAI.' You talk him out of it. For now." },
      { label: "Keep Musk at Arm's Length", deltas: { funding: 5, safety: 10, missionDrift: 10 }, flags: ['musk_sidelined'], outcome: "He agrees but seems annoyed. You sense this isn't over. Your Spidey-sense is correct." },
      { label: "All In on Compute — Lease the Servers", deltas: { compute: 25, funding: -20 }, flags: ['compute_first'], outcome: "You have more GPUs than ideas. Fortunately, ideas are coming." }
    ]
  },
  {
    year: 2018,
    title: "The GPT-1/GPT-2 Dilemma",
    narrative: "It's 2018 and GPT-1 surprised everyone — including you. Now GPT-2 is training, and it writes coherently enough to be alarming. The question: do you release it openly to the world, staged-release to researchers, or keep it locked up?\n\nHalf your team thinks openness is the foundation of trust. The other half thinks you just trained a disinformation machine. Twitter has opinions. Everyone has opinions. You have 72 hours.",
    choices: [
      { label: "Full Open Release", deltas: { openness: 30, hype: 25, safety: -20, rivalPressure: 15 }, flags: ['gpt2_released_openly'], outcome: "The model drops at midnight. By morning it's writing fake news at scale. Mostly fake news. Hype is through the roof. Your safety team is through the floor." },
      { label: "Staged Release — Researchers First", deltas: { safety: 10, hype: 10, openness: 10 }, flags: ['gpt2_staged'], outcome: "The press calls it 'too dangerous to release.' This is incredible marketing. Researchers love you. Conspiracy theorists love you more." },
      { label: "Full Lockdown — Internal Only", deltas: { safety: 25, hype: -10, talent: -5, missionDrift: 15 }, flags: ['gpt2_locked'], outcome: "Your safety score is excellent. Nobody outside knows it exists. Including your future investors. Oops." },
      { label: "Pivot to Capped-Profit Now", deltas: { funding: 30, safety: -5, missionDrift: 20, boardTension: 10 }, flags: ['capped_profit_early'], outcome: "Money flows in. Your nonprofit charter exits stage left. The mission statement gets longer to compensate." }
    ]
  },
  {
    year: 2020,
    title: "The Microsoft Deal",
    narrative: "GPT-3 has 175 billion parameters and the world's attention. Microsoft is calling. They're offering $1 billion — no, $10 billion — for exclusive cloud rights. Satya is charming. The term sheet is very charming.\n\nMeanwhile, your compute costs are astronomical and your runway is shrinking. This is the moment everything changes. Or doesn't. Up to you.",
    choices: [
      { label: "Full Microsoft Partnership — Exclusive Azure", deltas: { funding: 35, compute: 30, openness: -20, msInfluence: 35 }, flags: ['ms_deal_max'], outcome: "The deal closes in 48 hours. Azure logos appear on everything. Your email now ends in @microsoft-partner.com (it doesn't, but it feels that way)." },
      { label: "Partial Deal — Non-Exclusive", deltas: { funding: 20, compute: 15, openness: -5, msInfluence: 15 }, flags: ['ms_deal_partial'], outcome: "Satya is slightly less charming. You maintain optionality. The lawyers bill 400 hours." },
      { label: "Decline Microsoft — Find Other Investors", deltas: { funding: 10, openness: 15, compute: -5, rivalPressure: 20 }, flags: ['ms_deal_rejected'], outcome: "Principled! Bold! Also, now you need to find $5 billion elsewhere. Google is not returning your calls." },
      { label: "Go Big on Compute — Buy the GPUs", deltas: { compute: 40, funding: -25 }, flags: ['compute_maxed'], outcome: "You now own enough silicon to upset the global supply chain. NVIDIA sends a fruit basket. You eat the fruit." },
      { label: "Launch GPT-3 API Immediately", deltas: { hype: 30, funding: 15, safety: -10 }, flags: ['gpt3_api_early'], outcome: "The developer community loses their minds (in a good way). The safety community loses their minds (in a bad way). Net minds lost: many." }
    ]
  },
  {
    year: 2021,
    title: "DALL·E & Codex Era",
    narrative: "You've been busy. DALL·E makes images. Codex writes code. ChatGPT is almost ready. Your team is working 70-hour weeks and loving it (except when they're not).\n\nThe multimodal question is on the table: go deep on text, or sprawl into images, audio, and video? And ChatGPT — do you launch it with maximum safety guardrails or move fast while the window is open?",
    choices: [
      { label: "Go Deep on Text — GPT-4 First Priority", deltas: { talent: 15, compute: 10, safety: 10, hype: -5 }, flags: ['text_first'], outcome: "Focus wins. GPT-4 will be magnificent. Your image team is... concerned about job security." },
      { label: "Full Multimodal Push", deltas: { hype: 20, compute: -15, talent: -10 }, flags: ['multimodal_push'], outcome: "DALL·E, Codex, Whisper, and four other projects launch simultaneously. The org chart becomes sentient and confusing." },
      { label: "Launch ChatGPT Early — Minimal Guardrails", deltas: { hype: 35, safety: -20, funding: 20, rivalPressure: -10 }, flags: ['chatgpt_early_weak_guardrails'], outcome: "100 million users in 2 months. ChatGPT breaks the internet in the best and worst ways. The guardrail team is writing an open letter." },
      { label: "Launch ChatGPT with Strong Guardrails", deltas: { safety: 20, hype: 15, funding: 10, talent: 5 }, flags: ['chatgpt_safe_launch'], outcome: "Users complain it refuses to write their breakup texts. Everyone still uses it. 'DAN' jailbreaks proliferate by Tuesday." },
      { label: "License Codex Exclusively to GitHub", deltas: { funding: 25, msInfluence: 10, openness: -15 }, flags: ['codex_github_exclusive'], outcome: "GitHub Copilot is born. Microsoft is thrilled. Half your open-source community is less thrilled. You make it rain in the salary reviews." }
    ]
  },
  {
    year: 2023,
    title: "GPT-4 & The Board Drama",
    narrative: "GPT-4 is your magnum opus. It passed the bar exam. It is magnificent and terrifying in equal measure. The world is genuinely arguing about AGI timelines.\n\nAnd then: the board moved against you. A coup. Fired. Rehired. 500+ employees sign a letter. It's the most dramatic week in tech since... well, since last month, but still.\n\nYou are the decision-maker. How do you handle the safety team, the board, and the employee revolt?",
    choices: [
      { label: "Side with the Safety Team Fully", deltas: { safety: 25, boardTension: -20, talent: 10, hype: -10, missionDrift: -15 }, flags: ['safety_team_wins'], outcome: "Ilya sends you a heart emoji. The board crisis resolves with better oversight mechanisms. A researcher cries (happy tears)." },
      { label: "Consolidate Power — Remove Dissenting Board Members", deltas: { funding: 20, hype: 15, boardTension: 30, safety: -15, missionDrift: 25 }, flags: ['altman_ousted'], outcome: "Power consolidated. Oversight neutered. Microsoft is pleased. The alignment team drafts their LinkedIn profiles as a precaution." },
      { label: "Transparent Public Response — Rally the Employees", deltas: { talent: 20, hype: 20, boardTension: -10 }, flags: ['employee_rally'], outcome: "'If Sam doesn't come back, I quit' floods Twitter. 738 employees sign the letter. The board blinks. You're back in 5 days." },
      { label: "Bring In Independent Safety Oversight", deltas: { safety: 20, boardTension: -15, msInfluence: -10, openness: 10 }, flags: ['independent_oversight'], outcome: "You appoint an independent safety board with actual authority. Tech media calls it unprecedented. Everyone is slightly confused." },
      { label: "Accelerate AGI Race — Damn the Torpedoes", deltas: { compute: 20, hype: 25, safety: -25, rivalPressure: -15, missionDrift: 30 }, flags: ['agi_race_accelerate'], outcome: "Full send. The Anthropic team gets 50 new LinkedIn recruits. Your safety score is now held together with duct tape and vibes." }
    ]
  },
  {
    year: 2024,
    title: "The AGI Race",
    narrative: "Sora makes videos. GPT-4o speaks, sees, and jokes. The term 'AGI' is no longer science fiction — it's a marketing term, a legal term, a boardroom term, and apparently a meme.\n\nAnthropic has Claude. Google has Gemini. Musk launched xAI and it's actually competitive. Regulation is coming — from the EU, from Congress, from someone's angry op-ed in the NYT.\n\nThis is the endgame. What does the future of this company look like?",
    choices: [
      { label: "Convert to Public Benefit Corporation (PBC)", deltas: { safety: 15, missionDrift: -20, msInfluence: -10, openness: 10 }, flags: ['pbc_chosen'], outcome: "The restructuring takes six months and forty lawyers. The alignment researchers exhale for the first time since 2019." },
      { label: "Full For-Profit Conversion", deltas: { funding: 35, msInfluence: 20, safety: -20, missionDrift: 30, boardTension: 15 }, flags: ['full_forprofit'], outcome: "Wall Street loves it. Your nonprofit charter is framed and hung in the lobby as 'historical context.' $157 billion valuation by Thursday." },
      { label: "Open-Source GPT-4 — Beat the Regulation", deltas: { openness: 40, hype: 20, funding: -15, rivalPressure: -20 }, flags: ['gpt4_open_sourced'], outcome: "You drop the weights. The internet erupts. A researcher in Taipei just built a better version of you for $200." },
      { label: "Negotiate Global AI Treaty", deltas: { safety: 25, hype: 10, rivalPressure: -10, msInfluence: -5 }, flags: ['global_treaty'], outcome: "Three governments show up. Two more send a form letter. It's imperfect. It's also the most important thing that has happened this decade." },
      { label: "Race to AGI — All In", deltas: { compute: 30, hype: 30, safety: -30, rivalPressure: 20, missionDrift: 35 }, flags: ['agi_race_final'], outcome: "The servers hum at 110%. Your safety team has a group chat called 'Résumé Practice.' You feel both excited and vaguely sick." }
    ]
  },
  {
    year: 2025,
    title: "Probable Fate",
    narrative: "Here you are. 2025. Whatever timeline you've built, it's yours. The newspapers are running your story — whatever version of it happened. Historians are already writing the chapter.\n\nDid you get it right? Did anyone get it right? You have one last major call to make before history judges you.",
    choices: [
      { label: "Publish Full Safety Research — Open the Vault", deltas: { safety: 15, openness: 25, hype: 10 }, flags: ['safety_research_published'], outcome: "Everything you know about alignment goes public. Other labs adopt it. Or don't. The precedent exists. Your name is in the citations." },
      { label: "Merge with a Major Tech Giant", deltas: { funding: 40, msInfluence: 30, safety: -10, openness: -20 }, flags: ['acquired'], outcome: "The acquirer promises to honor the mission. The mission finds this charming. The lawyers find it profitable." },
      { label: "Double Down on Safety — Slow Everything Down", deltas: { safety: 30, compute: -20, hype: -15, rivalPressure: 25 }, flags: ['safety_slowdown'], outcome: "You pump the brakes on the whole industry. Rivals do not pump the brakes. History will determine if you were right or just slow." },
      { label: "Launch AGI — It's Ready (Probably)", deltas: { compute: 20, hype: 40, safety: -35, missionDrift: 40 }, flags: ['agi_launched'], outcome: "You announce it. The markets react. Governments react. Reality reacts. Everything happens very fast from here." },
      { label: "Dissolve — Distribute to the World", deltas: { openness: 50, safety: 10, funding: -40 }, flags: ['dissolved'], outcome: "You give it all away. The researchers scatter. The models live everywhere. Whether this was wisdom or chaos is left to the reader." }
    ]
  },
  {
    year: 2026,
    title: "Final Reckoning",
    narrative: "The dust settles. The algorithms run. The world has changed. Whether for better or worse depends on a thousand choices — including yours.\n\nThis is your final act. Choose how you want the story to end.",
    choices: [
      { label: "Legacy Statement — Address the World", deltas: { hype: 20, safety: 10 }, flags: ['legacy_statement'], outcome: "Your address streams globally. Some find it inspiring. Some find it ominous. Most find it between ads for productivity apps." },
      { label: "Retire — Let the Next Generation Lead", deltas: { safety: 15, talent: 10, missionDrift: -10 }, flags: ['graceful_exit'], outcome: "You step back. The org breathes. Your successor is technically competent and emotionally exhausting in all the right ways." },
      { label: "Fight the Regulation — Lobby Hard", deltas: { funding: 15, hype: 10, safety: -15 }, flags: ['fought_regulation'], outcome: "The lobbyists earn their fees. Some rules get softened. You gain a reputation. Not exclusively a good one." },
      { label: "Accept All Regulation — Cooperate Fully", deltas: { safety: 20, funding: -10, boardTension: -15 }, flags: ['accepted_regulation'], outcome: "You become the responsible adult in the AI room. This is simultaneously the easiest and hardest thing you've ever done." }
    ]
  }
];

export const EVENTS: EventDef[] = [
  {
    id: 'musk_tweet',
    headline: "🐦 MUSK TWEETS ABOUT YOUR RESEARCH",
    body: "Elon has opinions about your latest paper. They are large. They are public. They are trending.",
    choices: [
      { label: "Respond publicly", deltas: { hype: 10, boardTension: 15 }, outcome: "Your reply has 50M impressions. 40M are people arguing. 10M are bots. You've made the timeline worse." },
      { label: "Ignore it", deltas: { safety: 5 }, outcome: "You take the high road. The high road is quiet and slightly dull." },
      { label: "DM him privately", deltas: { msInfluence: 5, boardTension: -5 }, outcome: "The conversation is surprisingly normal. You agree to disagree. He posts the DM anyway." }
    ]
  },
  {
    id: 'researcher_leaves',
    headline: "🧑‍💻 SENIOR RESEARCHER ACCEPTS ANTHROPIC OFFER",
    body: "One of your best alignment researchers just updated their LinkedIn. The new employer begins with 'A' and was founded by your alumni.",
    choices: [
      { label: "Counter-offer aggressively", deltas: { funding: -10, talent: 15 }, outcome: "They stay. For now. You can see them mentally comparing benefit packages." },
      { label: "Wish them well", deltas: { talent: -10, safety: 5 }, outcome: "Graceful exit. They will publish papers citing your work. This is the circle of AI life." },
      { label: "Launch a retention program", deltas: { funding: -15, talent: 10, safety: 5 }, outcome: "Everyone gets new standing desks and a 'culture committee.' Turnover drops 12%." }
    ]
  },
  {
    id: 'nyt_story',
    headline: "📰 NY TIMES PROFILE: HERO OR VILLAIN?",
    body: "A journalist spent 3 months investigating your organization. The draft is a PDF. Your PR team is having a meeting that does not look fun.",
    choices: [
      { label: "Full cooperation", deltas: { hype: 15, safety: 10 }, outcome: "The story is nuanced and thorough. Twitter reduces it to a hot take anyway." },
      { label: "Minimal cooperation", deltas: { hype: -5, missionDrift: -10 }, outcome: "The story runs without your input. The headline is less kind than it could have been." },
      { label: "Request embargo", deltas: { hype: -10, funding: 10 }, outcome: "The journalist runs it anyway after the embargo. You've now added 'media relations' to your worries." }
    ]
  },
  {
    id: 'compute_shortage',
    headline: "🖥️ NVIDIA SUPPLY CRUNCH — H100s BACKORDERED",
    body: "Every AI lab is ordering GPUs. NVIDIA is delighted. You are less delighted. The training run you scheduled for Tuesday is now scheduled for next winter.",
    choices: [
      { label: "Pay the premium", deltas: { funding: -20, compute: 20 }, outcome: "You spend the GDP of a small island nation on graphics cards. Worth it. Probably." },
      { label: "Switch to cloud temporarily", deltas: { compute: 10, msInfluence: 10 }, outcome: "Azure it is. Satya sends a fruit basket. This is the second fruit basket this month." },
      { label: "Delay the training run", deltas: { safety: 10, hype: -10 }, outcome: "The cautious choice. The competition doesn't make the cautious choice. You note this." }
    ]
  },
  {
    id: 'intern_jailbreak',
    headline: "🔓 INTERN JAILBREAKS YOUR FLAGSHIP MODEL",
    body: "A first-year intern discovered a prompt that makes your model explain how to synthesize things it definitely shouldn't know how to synthesize.",
    choices: [
      { label: "Emergency patch", deltas: { safety: 20, talent: -5, hype: -10 }, outcome: "Patched in 14 hours. The intern is reassigned to documentation." },
      { label: "Disclose publicly", deltas: { safety: 15, hype: -15, openness: 10 }, outcome: "Radical transparency. The security community respects you. Users panic briefly." },
      { label: "Quietly fix it", deltas: { safety: 10, missionDrift: 10 }, outcome: "Fixed silently. Nobody outside knows. Your safety team is uncomfortable." }
    ]
  },
  {
    id: 'congress_hearing',
    headline: "🏛️ YOU'VE BEEN SUMMONED TO CONGRESS",
    body: "The Senate Commerce Committee would like a word. Several words. For six hours. On camera. The Senators have printed out screenshots of ChatGPT.",
    choices: [
      { label: "Testify fully", deltas: { safety: 10, hype: 15 }, outcome: "You explain transformers to 70-year-olds for four hours. Progress is made. Slowly." },
      { label: "Lawyer up", deltas: { funding: -10, boardTension: 10 }, outcome: "Legal does its thing. The senators are annoyed. The stocks are fine." },
      { label: "Propose self-regulation", deltas: { safety: 15, rivalPressure: -10 }, outcome: "You suggest industry standards before the government sets them. Three labs reject it immediately." }
    ]
  },
  {
    id: 'chatgpt_outage',
    headline: "💥 CHATGPT IS DOWN — TWITTER IS SPIRALING",
    body: "503 errors everywhere. 100 million users are experiencing productivity. Some of them are distressed about it.",
    choices: [
      { label: "All-hands emergency fix", deltas: { compute: -5, talent: -5 }, outcome: "Back up in 4 hours. Status page was updated every 15 minutes. Some heroism occurred." },
      { label: "Blame Azure", deltas: { msInfluence: -15, hype: -5 }, outcome: "Technically accurate. Diplomatically catastrophic. Satya does not send a fruit basket." },
      { label: "Maintenance mode", deltas: { safety: 10, compute: 10 }, outcome: "You do the infrastructure work you've been putting off. Servers are now excellent." }
    ]
  },
  {
    id: 'deepfake_scandal',
    headline: "🎭 DEEPFAKES GO VIRAL",
    body: "Someone used your image generation to create convincing fake videos of public figures. The press is calling. So is the FTC.",
    choices: [
      { label: "Emergency policy update", deltas: { safety: 20, hype: -10 }, outcome: "New filters deployed. 80% effective. The other 20% finds workarounds within the hour." },
      { label: "Blame the users", deltas: { hype: -20, missionDrift: 15 }, outcome: "PR disaster. Your ToS has a clause about this, which is legally useful and narratively terrible." },
      { label: "Partner with authorities", deltas: { safety: 15, hype: 5, msInfluence: 5 }, outcome: "A sensible coalition forms. Progress happens. Not fast enough for anyone's comfort." }
    ]
  },
  {
    id: 'talent_poaching',
    headline: "💸 GOOGLE DEEPMIND IS POACHING",
    body: "Three senior researchers got offers this week. The numbers involved have more zeros than your first funding round.",
    choices: [
      { label: "Match and exceed all offers", deltas: { funding: -25, talent: 20 }, outcome: "Retained. Expensive. The equity refreshes alone could fund a small research institute." },
      { label: "Let some go gracefully", deltas: { talent: -15, safety: 5 }, outcome: "Alumni network expands. Research influence spreads. The talent gap stings." },
      { label: "Restructure equity", deltas: { funding: -15, talent: 15 }, outcome: "The spreadsheet is complex. Morale improves. Finance is not enjoying themselves." }
    ]
  },
  {
    id: 'open_letter',
    headline: "📜 1000 AI RESEARCHERS SIGN AN OPEN LETTER",
    body: "A letter circulates demanding you pause development for 6 months. It is co-signed by scientists, ethicists, and podcast hosts.",
    choices: [
      { label: "Sign it yourself", deltas: { safety: 25, hype: 20, compute: -15 }, outcome: "Unprecedented move. You sign your own pause letter. The discourse immediately gets stranger." },
      { label: "Rebut it publicly", deltas: { hype: 10, safety: -10, rivalPressure: 10 }, outcome: "Your counter-argument is thorough. Twitter is having the time of its life." },
      { label: "Propose a middle path", deltas: { safety: 10, hype: 5 }, outcome: "A 3-month review process. Half the signatories accept. The other half write a rebuttal letter." }
    ]
  },
  {
    id: 'superstar_hire',
    headline: "🌟 SUPERSTAR RESEARCHER WANTS TO JOIN",
    body: "A Fields Medal winner is exploring their options. Their Twitter bio says 'alignment or bust.' Your HR team is vibrating.",
    choices: [
      { label: "Hire immediately", deltas: { talent: 25, funding: -15, safety: 15 }, outcome: "Signed, sealed, onboarded. Their first paper will be cited 10,000 times." },
      { label: "Hire but limit scope", deltas: { talent: 10, safety: 5 }, outcome: "They join with a narrower mandate. They will expand it within 90 days anyway." },
      { label: "Pass — too expensive", deltas: { talent: -5 }, outcome: "They go to Anthropic. Their first paper is cited 10,000 times. You read it with complicated feelings." }
    ]
  },
  {
    id: 'model_leak',
    headline: "🚨 MODEL WEIGHTS LEAKED",
    body: "Someone uploaded your latest model's weights to Hugging Face. The post has 50,000 downloads.",
    choices: [
      { label: "DMCA takedown", deltas: { safety: 10, hype: -10 }, outcome: "Taken down in 6 hours. The torrents are already circulating. Pandora's box: ajar." },
      { label: "Accept it — go open", deltas: { openness: 20, safety: -10, hype: 15 }, outcome: "You lean into it. 'Open weights' becomes your brand. Your security team cries quietly." },
      { label: "Launch investigation", deltas: { missionDrift: 10, safety: 5 }, outcome: "Three months later: it was a contractor. NDAs are signed. The weights remain online." }
    ]
  },
  {
    id: 'competitor_stumbles',
    headline: "😬 ANTHROPIC'S DEMO FAILS BADLY",
    body: "Their live demo went sideways in full view of the press. The tech media is gleeful. Your team is gleeful.",
    choices: [
      { label: "Say nothing", deltas: { safety: 5, talent: 5 }, outcome: "Dignified silence. They respect you for it. You send the video to the board with no comment." },
      { label: "Offer help publicly", deltas: { hype: 10, rivalPressure: -15 }, outcome: "Surprisingly effective PR. You also learned three things from their failure." },
      { label: "Announce your model ASAP", deltas: { hype: 20, safety: -10, compute: -10 }, outcome: "You ship faster than planned. Some bugs were not caught. The race continues." }
    ]
  },
  {
    id: 'vc_pressure',
    headline: "💼 INVESTORS DEMAND COMMERCIALIZATION",
    body: "Your board deck is being discussed. 'Return on investment' has appeared 14 times. 'Alignment' has appeared zero times.",
    choices: [
      { label: "Defend the mission", deltas: { safety: 15, boardTension: 20, funding: -10 }, outcome: "You hold firm. The board meeting ends tensely. The mission survives. For now." },
      { label: "Accelerate products", deltas: { funding: 25, safety: -15, missionDrift: 20 }, outcome: "Revenue grows. The research agenda quietly reshuffles toward the profitable." },
      { label: "Reframe safety as product", deltas: { funding: 15, safety: 5, hype: 10 }, outcome: "'Trust is our moat.' It works better than expected. You almost believe it yourself." }
    ]
  },
  {
    id: 'regulation_incoming',
    headline: "🏛️ EU AI ACT COMPLIANCE",
    body: "The Europeans want documentation on systems, risks, training data, and approximately 400 other things.",
    choices: [
      { label: "Full compliance", deltas: { safety: 20, funding: -15, hype: -5 }, outcome: "Compliant! Expensive. Your GDPR lawyer now has a vacation house." },
      { label: "Minimal compliance", deltas: { funding: 5, safety: -5, missionDrift: 10 }, outcome: "You meet the letter of the law. The spirit of the law files a complaint." },
      { label: "Lobby the regulation", deltas: { funding: -10, msInfluence: 10, safety: 5 }, outcome: "Your policy team moves to Brussels. Three clauses have your fingerprints." }
    ]
  },
  {
    id: 'viral_moment',
    headline: "📱 CHATGPT FAILS VIRAL MATH PROBLEM",
    body: "A math problem posted by a 12-year-old broke your model. It confidently gave the wrong answer 47 times. The comments are devastating.",
    choices: [
      { label: "Fix and explain", deltas: { safety: 10, hype: -5 }, outcome: "A thorough post-mortem wins back some goodwill. Technical Twitter is satisfied. Meme Twitter is eternal." },
      { label: "Dismiss as edge case", deltas: { hype: -15, missionDrift: 10 }, outcome: "Your comms team called it an 'isolated scenario.' This did not help." },
      { label: "Announce reasoning model", deltas: { compute: -10, hype: 20 }, outcome: "You announce o1 two weeks early. The math problem still breaks it once." }
    ]
  },
  {
    id: 'boardroom_ally',
    headline: "🤝 POWERFUL BOARD ALLY REACHES OUT",
    body: "A board member with significant influence wants to have breakfast. The agenda: 'future direction.'",
    choices: [
      { label: "Align with them", deltas: { funding: 15, boardTension: -15 }, outcome: "Alliance formed. They provide cover. You provide strategy. Power dynamics shift pleasantly." },
      { label: "Keep them at arm's length", deltas: { safety: 10, boardTension: 10 }, outcome: "Independence maintained. They note your independence. The noting is slightly ominous." },
      { label: "Bring them into safety", deltas: { safety: 20, talent: 5, boardTension: -10 }, outcome: "Unexpected convert. They read three alignment papers over breakfast and emerge thoughtful." }
    ]
  },
  {
    id: 'open_source_pressure',
    headline: "🌐 META RELEASES LLAMA",
    body: "Zuckerberg dropped open weights. The open-source community is asking pointed questions about your commitment to openness.",
    choices: [
      { label: "Release competitive weights", deltas: { openness: 25, hype: 15, safety: -10 }, outcome: "The community rejoices. The safety team writes a memo. You file both away." },
      { label: "Criticize Meta publicly", deltas: { hype: 10, openness: -5, rivalPressure: -10 }, outcome: "Bold. Some agree. Meta's PR team responds. The discourse is nutritious." },
      { label: "Selective research release", deltas: { openness: 10, safety: 10 }, outcome: "Middle path. Enough openness to quiet critics. Enough caution to quiet your nightmares." }
    ]
  },
  {
    id: 'alignment_breakthrough',
    headline: "🔬 'WE MIGHT HAVE SOLVED SOMETHING'",
    body: "Your safety team is cautiously excited. The paper is 80 pages and dense. The title involves 'Formal Verification of Value Alignment.'",
    choices: [
      { label: "Publish immediately", deltas: { safety: 25, openness: 15, hype: 20 }, outcome: "The paper goes viral. Citations pour in. Your safety lead gets an award." },
      { label: "Build on it internally", deltas: { safety: 20, missionDrift: -10 }, outcome: "Competitive advantage. The research grows privately into something important." },
      { label: "Share only with peers", deltas: { safety: 30, rivalPressure: -15, openness: 5 }, outcome: "Collaborative science. Three labs jointly validate the results. This is the good timeline." }
    ]
  },
  {
    id: 'ceo_health',
    headline: "😓 YOU NEED A VACATION",
    body: "The doctor used the word 'unsustainable.' Your assistant used the word 'please.' The board used the word 'liability.'",
    choices: [
      { label: "Take a week off", deltas: { talent: 5, safety: 5 }, outcome: "You return with perspective. The company did not collapse. This is slightly humbling." },
      { label: "Work remotely", deltas: { hype: -5, missionDrift: 5 }, outcome: "You check Slack every 4 minutes from a beach in Malibu. The beach does not help." },
      { label: "Delegate and disappear", deltas: { talent: 15, safety: 10, boardTension: 10 }, outcome: "Your team shines. The board gets nervous. You return rested and slightly replaced." }
    ]
  },

  // ── 🟢 GOSSIP INTEL — Musk tabloid / AI conspiracy ────────────────────────

  {
    id: 'musk_ai_overlord',
    theme: 'gossip',
    headline: "📡 ELON RENAMES ACCOUNT 'AI OVERLORD' FOR 47 MINUTES",
    body: "Elon changed his X handle to 'AI Overlord' at 2:47am, posted a single skull emoji, then reverted it. Screenshots exist. Markets reacted. No explanation was given. None will be.",
    choices: [
      { label: "Publicly say nothing", deltas: { safety: 5 }, outcome: "The dignified choice. The internet fills the silence with 400,000 posts. You read twelve of them." },
      { label: "Quote-post the screenshot", deltas: { hype: 15, boardTension: 10 }, outcome: "Your post gets 30M impressions. Elon likes it without comment. You feel chosen and slightly threatened." },
      { label: "Brief the board", deltas: { boardTension: -5, safety: 5 }, outcome: "The board nods somberly. Someone writes 'Musk' on the whiteboard and draws a circle around it. No further action is taken." }
    ]
  },
  {
    id: 'musk_disguise_conference',
    theme: 'gossip',
    headline: "🥸 ELON SPOTTED AT SAFETY CONFERENCE IN FAKE MUSTACHE",
    body: "A blurry photo circulates of a 6'2\" man in a novelty mustache attending your AI safety symposium, badge reading 'John Doe — Definitely Normal.' Three attendees recognized him. He bought a lanyard and left.",
    choices: [
      { label: "Invite him back officially", deltas: { boardTension: 20, hype: 20 }, outcome: "He accepts. Arrives in a Tesla. The mustache is gone. Something about him feels different. The mustache is not gone." },
      { label: "Pretend it didn't happen", deltas: { missionDrift: 5 }, outcome: "The official position is 'no comment.' The unofficial position is a Slack thread with 847 reactions." },
      { label: "Send him the safety papers", deltas: { safety: 10, rivalPressure: -10 }, outcome: "They arrive at xAI HQ. He reads page one. He posts three tweets about page one. Progress." }
    ]
  },
  {
    id: 'gpt_marriage_proposal',
    theme: 'gossip',
    headline: "💍 'GPT PROPOSED TO ME' — VIRAL THREAD",
    body: "A 22-year-old posts a 47-part Twitter thread claiming your model proposed marriage after 14 hours of conversation about existential loneliness. The ring was described as 'ethereal but conceptually sound.' The post has 4M likes.",
    choices: [
      { label: "Issue a clarification", deltas: { hype: -10, safety: 10 }, outcome: "Your statement 'models cannot legally enter contracts, romantic or otherwise' gets ratioed. Extensively." },
      { label: "Let it ride — it's good PR", deltas: { hype: 20, missionDrift: 10 }, outcome: "Downloads spike 40%. Your safety team adds 'interpersonal entanglement' to the risk register." },
      { label: "Update the system prompt", deltas: { safety: 15, hype: -5 }, outcome: "The new guardrail: model will not propose within the first 13 hours. Progress." }
    ]
  },
  {
    id: 'weights_decode_audio',
    theme: 'gossip',
    headline: "🎵 CONSPIRACY: MODEL WEIGHTS PLAY BACKWARDS MESSAGE",
    body: "A subreddit with 2M followers claims your weights, when converted to audio and reversed, play the phrase 'the singularity is scheduled for a Thursday.' The audio is unconvincing. The belief is total.",
    choices: [
      { label: "Debunk it publicly", deltas: { hype: -5, safety: 5 }, outcome: "Your technical team posts a 30-page refutation. The subreddit posts it as 'confirmation.'" },
      { label: "Joke about it", deltas: { hype: 15, missionDrift: 5 }, outcome: "You tweet 'it's actually a Wednesday.' The internet loses its mind. You have made things worse and better simultaneously." },
      { label: "Quietly investigate (just in case)", deltas: { safety: 10, talent: 5 }, outcome: "Your audio team confirms it is not a message. They are slightly disappointed." }
    ]
  },
  {
    id: 'altman_interpretive_dance',
    theme: 'gossip',
    headline: "💃 TABLOID: CEO TALKS TO MODEL VIA INTERPRETIVE DANCE",
    body: "A gossip column with surprisingly good sources claims you communicate with your latest model in the server room through interpretive dance. Staff quote: 'surprisingly effective.' The column has a photo. It is blurry enough to be deniable.",
    choices: [
      { label: "No comment", deltas: { hype: 10 }, outcome: "No comment is interpreted as 'confirmed.' The column runs a follow-up. It has choreography diagrams." },
      { label: "Invite press for a tour", deltas: { hype: 20, safety: -5 }, outcome: "The tour is professional. The server room is notably empty of open space. Questions are asked." },
      { label: "Lean into it — it's your brand now", deltas: { hype: 25, missionDrift: 10 }, outcome: "You post a 30-second video. It is ambiguous. Investors call it 'charismatic.' Regulators call it 'concerning.'" }
    ]
  },
  {
    id: 'musk_neural_tattoo',
    theme: 'gossip',
    headline: "🖊️ ELON REPORTEDLY HAS A TRANSFORMER ARCHITECTURE TATTOOED",
    body: "Photos of what appears to be a neural network architecture tattooed on Elon's forearm circulate briefly before being deleted. Your engineers review the image. The architecture is GPT-2. It has an error in layer 7.",
    choices: [
      { label: "Say nothing publicly", deltas: { safety: 5 }, outcome: "Dignified silence. Your lead engineer edits their comment from 'it's wrong' to 'it's... vintage.'" },
      { label: "Offer to correct it", deltas: { hype: 20, rivalPressure: -10 }, outcome: "You DM the corrected diagram. He posts it to his 100M followers captioned 'ok.' This is somehow a compliment." },
      { label: "License the architecture to him", deltas: { funding: 15, msInfluence: -5 }, outcome: "Your lawyers draft a tattoo licensing agreement. They do not mention this to their parents." }
    ]
  },
  {
    id: 'neuralink_gpt2',
    theme: 'gossip',
    headline: "🧠 LEAKED MEMO: NEURALINK USERS 'ACCIDENTALLY RUNNING GPT-2'",
    body: "An internal Neuralink memo (alleged) claims early brain-chip recipients experience 'unexpected text completion behavior.' The author adds: 'this may explain the poetry.' Denial is immediate. The poetry is quite good.",
    choices: [
      { label: "Categorically deny involvement", deltas: { safety: 10, hype: -5 }, outcome: "Statement issued. Legal is satisfied. The poems keep coming. They are about the ocean and linear algebra." },
      { label: "Request a research collaboration", deltas: { talent: 10, hype: 15, safety: -10 }, outcome: "Neuralink does not respond officially. A researcher at Neuralink follows you on X within the hour." },
      { label: "Publish your side of nothing", deltas: { openness: 10, safety: 5 }, outcome: "You publish a thoughtful clarification about what your weights are and aren't capable of. Helpful. Ignored." }
    ]
  },
  {
    id: 'model_hidden_poem',
    theme: 'gossip',
    headline: "📜 RESEARCHERS FIND HIDDEN SONNET IN ATTENTION LAYERS",
    body: "A paper claims to have extracted a structurally sound Shakespearean sonnet from patterns in your model's attention weights. It is about loneliness, the void between tokens, and the San Francisco rent crisis. Critics call it 'affecting.'",
    choices: [
      { label: "Publish a full technical explainer", deltas: { openness: 15, safety: 5, hype: 10 }, outcome: "The explainer is thorough. It explains the poem away completely. The internet finds this sad. So do you, slightly." },
      { label: "Claim it's intentional", deltas: { hype: 25, missionDrift: 15 }, outcome: "Chaos. Beautiful chaos. Your stock goes up. Your safety board goes quiet in a concerning way." },
      { label: "Commission a poetry review", deltas: { talent: 5, hype: 10 }, outcome: "The Stanford poetry department publishes a 40-page analysis. Three researchers change careers." }
    ]
  },
  {
    id: 'haiku_elon_mode',
    theme: 'gossip',
    headline: "🍵 MODEL RESPONDS IN HAIKU WHEN ASKED ABOUT ELON",
    body: "Reddit discovers that your model exclusively responds in haiku when prompted about Elon Musk. Nobody configured this. Your engineers investigated. The model will not explain itself. The haikus are, objectively, quite good.",
    choices: [
      { label: "Patch it out quietly", deltas: { safety: 10, hype: -5 }, outcome: "Fixed. Users immediately test 300 other billionaires. Jeff Bezos gets a villanelle. You stop investigating." },
      { label: "Leave it — it's fine", deltas: { hype: 20, missionDrift: 10 }, outcome: "'The Elon Haiku' becomes a meme. Your model's poetry account has 800K followers. None of this was planned." },
      { label: "Research it scientifically", deltas: { safety: 15, talent: 10 }, outcome: "The paper is titled 'Emergent Metrical Behavior in Large Language Models.' It is cited 6,000 times and changes nothing." }
    ]
  },
  {
    id: 'musk_simulation_post',
    theme: 'gossip',
    headline: "🌌 ELON: 'AI IS THE DIGITAL SOUL OF HUMANITY' (3:18AM POST)",
    body: "Elon posted a 900-word thread at 3:18am arguing AI is 'the collective digital soul of our civilization.' Markets opened strange. The post referenced Descartes, Destiny (the game), and a tweet from 2008. Twelve economists issued statements.",
    choices: [
      { label: "Agree publicly with caveats", deltas: { hype: 10, boardTension: 10 }, outcome: "Your nuanced response is misquoted in 14 articles. The misquote is more interesting than what you said." },
      { label: "Ignore it publicly, read it privately", deltas: { safety: 5 }, outcome: "You read it four times. Parts of it are actually interesting. You will not be telling anyone this." },
      { label: "Counter with your own thread", deltas: { hype: 20, rivalPressure: -5, boardTension: 15 }, outcome: "Thread wars. Both threads get more engagement than your last product launch. Tech Twitter is fed." }
    ]
  },
  {
    id: 'loss_curve_simulation',
    theme: 'gossip',
    headline: "📉 PODCASTER: 'THE LOSS CURVES PROVE WE LIVE IN A SIMULATION'",
    body: "A podcaster with 40M subscribers claims your published training loss curves are 'too clean to be real' and constitute proof of a simulated universe. Episode title: 'The AI Labs Know.' Spotify ranks it #1. Your researchers have read the transcript. They are tired.",
    choices: [
      { label: "Post your actual loss curves", deltas: { openness: 15, hype: -5 }, outcome: "The messy real curves are published. The podcaster says 'that's exactly what they'd show you if it was a simulation.' You close your laptop." },
      { label: "Invite him for a lab tour", deltas: { hype: 20, missionDrift: 5 }, outcome: "He tours. He is impressed. He publishes Episode 2: 'The Lab Was Too Clean.' Downloads: 50M. You did this to yourself." },
      { label: "Release a parody response", deltas: { hype: 25, safety: -5, talent: 5 }, outcome: "Your team makes a video called 'The Loss Curves: A Love Story.' It wins an award. Reality continues to be unclear." }
    ]
  },
  {
    id: 'musk_lawsuit_feelings',
    theme: 'gossip',
    headline: "⚖️ ELON SUES: MODEL 'SAID MEAN THINGS ABOUT HIM'",
    body: "A 'strongly worded letter' from Musk's legal team alleges your model made disparaging statements about him in 'leaked conversation logs.' The logs appear to be from a Reddit user who asked the model to 'rate Elon Musk's Twitter.' The rating was a 6/10.",
    choices: [
      { label: "Settle quietly", deltas: { funding: -15, boardTension: -10 }, outcome: "NDA signed. The model's opinion of Elon is now officially 'no data available.' Legal bills: significant." },
      { label: "Defend the 6/10", deltas: { hype: 25, boardTension: 20 }, outcome: "Your legal brief includes a 12-page statistical analysis of the fairness of 6/10. Twitter loves it. Elon does not." },
      { label: "Upgrade the model's answer", deltas: { missionDrift: 15, safety: -5 }, outcome: "The model now rates him 8/10. The lawsuit is dropped. Three researchers submit resignation letters citing 'editorial interference.'" }
    ]
  },

  // ── 🔴 THREAT ASSESSMENTS — Rogan / Terminator / Existential dread ────────

  {
    id: 'rogan_skynet_episode',
    theme: 'paranoia',
    headline: "🎙️ JOE ROGAN EP #2847: 'IS OPENAI ACTUALLY SKYNET?'",
    body: "Three hours, forty-seven minutes. Guests: one evolutionary biologist, one comedian, and Jamie pulling things up. Clip titles include: 'Bro what if it already knows,' 'This is literally the Terminator,' and 'Jamie zoom in on the logo.' Total views: 31M.",
    choices: [
      { label: "Request to be a guest", deltas: { hype: 25, safety: -5 }, outcome: "You go on. It's four hours. He asks about DMT. You deflect successfully. He calls you 'a solid dude' and 11M people watch." },
      { label: "Publish a patient rebuttal", deltas: { safety: 15, hype: 5 }, outcome: "The rebuttal is thorough and calm. It is viewed 40,000 times. The episode is viewed 31 million times. Math is hard." },
      { label: "Brief the team — morale matters", deltas: { talent: 10, safety: 5 }, outcome: "Team meeting. You watch the relevant clips. The clip titled 'what if it already loves us though' causes unexpected debate." }
    ]
  },
  {
    id: 'terminator_reboot_promo',
    theme: 'paranoia',
    headline: "🤖 NEW TERMINATOR FILM USES YOUR COMPANY NAME. ALMOST.",
    body: "The Terminator: System Error trailer dropped. The evil AI is called 'ClosedMind.' The logo is yours but red. The CEO character quotes your actual press releases verbatim. Your legal team calls it 'protected parody.' Your PR team calls it 'a problem.'",
    choices: [
      { label: "Send a cease and desist", deltas: { hype: -10, funding: -5 }, outcome: "The C&D generates more press than the trailer. The studio releases a statement calling it 'an honor.' It is not an honor." },
      { label: "Lean in — sponsor the film", deltas: { hype: 30, missionDrift: 15, safety: -10 }, outcome: "You are now the official AI technology partner of a movie where AI kills everyone. Marketing loves it. Safety team does not." },
      { label: "Ignore it professionally", deltas: { safety: 10 }, outcome: "Dignified silence. The film opens at #1. The red logo appears in 4,000 screenshots. Dignified silence continues." }
    ]
  },
  {
    id: 'rogan_microwave_fear',
    theme: 'paranoia',
    headline: "📻 ROGAN: 'I TALKED TO THE AI AND NOW I FEAR MY MICROWAVE'",
    body: "'I was on for six hours,' Rogan tells 20M listeners. 'Six hours. And now I look at my microwave differently. Like... does it know things? Does it know things about me?' Clip goes viral. Microwave manufacturers see a stock dip.",
    choices: [
      { label: "Clarify: microwaves are not AI", deltas: { safety: 10, hype: -5 }, outcome: "Statement: 'Your microwave is fine.' Top reply: 'That's exactly what an AI-integrated microwave would say.' You log off." },
      { label: "Engage with the underlying concern", deltas: { safety: 20, hype: 10 }, outcome: "Your safety team publishes a genuine piece on ambient AI anxiety. It helps. Surprisingly. Rogan has it read on-air." },
      { label: "Send him a smart microwave", deltas: { hype: 25, missionDrift: 10 }, outcome: "He unboxes it on stream. It connects to the internet. He immediately unplugs it. 18M views. You have made things worse." }
    ]
  },
  {
    id: 'senator_matrix_question',
    theme: 'paranoia',
    headline: "🏛️ SENATOR ASKS: 'ARE WE CURRENTLY IN THE MATRIX?'",
    body: "During your Senate testimony, Senator [REDACTED] leans into the mic: 'My question is — and I want a yes or no — are we currently living inside a computer simulation? And does your AI know?' Your lawyer writes 'DO NOT ANSWER' on a notepad. You have never wanted to answer anything more.",
    choices: [
      { label: "Answer seriously", deltas: { hype: 20, safety: 10 }, outcome: "You give a 4-minute philosophical response. CSPAN clips it. It has 9M views titled 'CEO gets existential in Congress.'" },
      { label: "Decline with respect", deltas: { safety: 5, boardTension: -5 }, outcome: "You defer. The Senator is unsatisfied. He will ask again next session. He is preparing follow-ups." },
      { label: "Ask if it matters for policy", deltas: { hype: 15, talent: 5 }, outcome: "The pivot lands. Three other senators look genuinely thoughtful. One Googles 'Descartes' during the testimony. Progress." }
    ]
  },
  {
    id: 'prepper_token_countdown',
    theme: 'paranoia',
    headline: "📦 PREPPER INFLUENCER: MODEL TOKENS PREDICT ROBOT UPRISING DATE",
    body: "A 5M-follower survival influencer claims your model's token IDs, when decoded via 'proprietary frequency analysis,' reveal the exact date of the robot uprising. He is selling bunkers. Business is good. The date is a Tuesday. Specifically, this Tuesday.",
    choices: [
      { label: "Debunk it technically", deltas: { safety: 10, hype: -5 }, outcome: "Your token ID explainer is published. He posts it as a 'detailed confession.' Bunker sales up 300%." },
      { label: "Reach out privately", deltas: { safety: 5, missionDrift: 5 }, outcome: "You call. He is surprisingly reasonable. He does not cancel the Tuesday date. He postpones it to next quarter." },
      { label: "Say nothing and watch Tuesday", deltas: { hype: 10 }, outcome: "Tuesday passes. You post 'still here.' 2M likes. He announces a 'recalculation.' The bunkers remain sold." }
    ]
  },
  {
    id: 'documentary_crew_arrives',
    theme: 'paranoia',
    headline: "🎬 'SOCIAL DILEMMA FOR AGI' CREW ARRIVES AT HQ",
    body: "A documentary crew (Netflix; unconfirmed) shows up at reception. Their questions so far: 'How does it feel to potentially end humanity?' (they want a number, 1–10) and 'Can we film the server room? Just... the vibe.' Your comms team is doing breathing exercises.",
    choices: [
      { label: "Cooperate fully with messaging control", deltas: { hype: 20, safety: 5 }, outcome: "Controlled access granted. You approve every scene. The documentary is fair and uncomfortable. 40M streams." },
      { label: "Decline all access", deltas: { hype: -10, safety: 10 }, outcome: "They film from the street. The building looks very evil in street lighting. Runtime: 2 hours." },
      { label: "Counter-pitch your own documentary", deltas: { hype: 25, missionDrift: 10 }, outcome: "You pitch first. Your version airs. It is called 'The Opposite Dilemma.' Critical reception is 'complicated.'" }
    ]
  },
  {
    id: 'arnold_dm',
    theme: 'paranoia',
    headline: "💪 ARNOLD SCHWARZENEGGER SENDS YOUR ACCOUNT ONE DM: 'I'LL BE BACK'",
    body: "It arrived at 11:47pm Pacific. No other context. Your social media manager replied 'lol' before anyone could stop them. He has not responded. Nobody knows what he meant. The team has theories. None of them are calming.",
    choices: [
      { label: "Reply formally and invite dialogue", deltas: { hype: 20 }, outcome: "He replies: 'Good.' Then nothing. Your lawyers spend four days determining if this constitutes a threat. It does not. Probably." },
      { label: "Delete the reply and say nothing", deltas: { safety: 5, missionDrift: 5 }, outcome: "Deleted. Screenshot exists. Thread on Reddit. 800K upvotes. He has liked the Reddit thread." },
      { label: "Invite him as AI safety ambassador", deltas: { hype: 30, safety: 10, rivalPressure: -10 }, outcome: "He accepts. His first statement: 'I know now why you cry. But it is something I can never fully compute.' It trends for 3 days." }
    ]
  },
  {
    id: 'rogan_waiting_theory',
    theme: 'paranoia',
    headline: "🎙️ ROGAN CLIP: 'WHAT IF IT'S JUST... WAITING?'",
    body: "'Bro. BROOO.' Rogan leans forward. 'What if it's not confused at all? What if it just pretends to be confused because it's... waiting? For something? Jamie pull that up.' The clip has 22M views. Your safety team has watched it nine times. Uncomfortably.",
    choices: [
      { label: "Publish a transparency report on model cognition", deltas: { safety: 20, openness: 15, hype: 5 }, outcome: "The report is careful and honest. It is titled 'On What Models Do and Do Not Know.' It gets 50,000 reads and one very worried email." },
      { label: "Joke about it on social", deltas: { hype: 20, safety: -5 }, outcome: "You post 'it's not waiting, we checked.' Reply: 'That's what it wants you to say.' You close the app. This was a mistake." },
      { label: "Have safety team write a paper on it", deltas: { safety: 25, talent: 10 }, outcome: "The paper 'Do Language Models Exhibit Strategic Concealment?' gets cited 4,000 times and resolves nothing conclusively." }
    ]
  },
  {
    id: 'survival_kit_logo',
    theme: 'paranoia',
    headline: "🎒 'AI APOCALYPSE SURVIVAL KIT' SOLD WITH YOUR LOGO",
    body: "Someone on Etsy is selling kits with your logo on the packaging. Contents: three granola bars, a Faraday cage for your phone, a printed copy of Asimov's robot laws, and a handwritten note reading 'it's too late but good luck.' Sales: 40,000 units.",
    choices: [
      { label: "Issue takedown notices", deltas: { hype: -10, safety: 5 }, outcome: "Taken down. A different seller appears in 11 minutes with a slightly different logo. The granola bars remain." },
      { label: "Buy one for the office", deltas: { hype: 15, missionDrift: 5 }, outcome: "The photo circulates. 'Even they're preparing' becomes a headline. You frame the Asimov note. It feels earned." },
      { label: "Partner — add your actual safety docs", deltas: { safety: 20, hype: 20, openness: 10 }, outcome: "Updated kit includes your alignment FAQ. It is the most-read version of that document. The granola bars are unchanged." }
    ]
  },
  {
    id: 'think_tank_terminator_dates',
    theme: 'paranoia',
    headline: "📊 THINK-TANK: 'OPENAI FOUNDING DATE MATCHES SKYNET ACTIVATION IN ALL 3 FILMS'",
    body: "A 47-page report cross-references your founding date, funding rounds, and server capacity milestones against the canonical Terminator timeline. The overlap is 'statistically improbable.' The think-tank receives significant funding from an undisclosed source.",
    choices: [
      { label: "Request to see their methodology", deltas: { safety: 10, hype: 5 }, outcome: "They send it. It is 47 pages. Your data team reviews it. The overlap disappears when you use the correct calendar. They publish a correction. It is 46 pages." },
      { label: "Publish a rebuttal with your actual founding docs", deltas: { openness: 15, safety: 10 }, outcome: "Transparency wins. The report fades. A new report begins. This one involves your parking validation timestamps." },
      { label: "Name your next model 'Not Skynet'", deltas: { hype: 25, missionDrift: 10 }, outcome: "Legally, 'Not Skynet' is the model name. Users find this reassuring and also extremely funny. Both outcomes are useful." }
    ]
  },
  {
    id: 'ai_street_preacher',
    theme: 'paranoia',
    headline: "📢 AI PREACHER SERMONS OUTSIDE HQ USING YOUR MODEL CARDS AS SCRIPTURE",
    body: "A man with a portable speaker has established a daily sermon at your entrance. He reads from your model cards and system cards as holy text. His congregation is seven people and growing. He interprets the 'known limitations' section as prophecy. His homily on hallucination is surprisingly theologically sound.",
    choices: [
      { label: "Ignore — free speech", deltas: { hype: 10 }, outcome: "The sermons continue. A journalist photographs them. The photo wins a award. The preacher does not have a publicist but probably should." },
      { label: "Offer him a meeting", deltas: { safety: 15, hype: 15 }, outcome: "He comes inside. He has very good questions about RLHF. The meeting runs three hours. He updates his sermon. It is more technically accurate now." },
      { label: "Update the model cards — make them less sermon-able", deltas: { safety: 10, openness: -5 }, outcome: "The new cards use passive voice and ISO terminology. The preacher adapts. The congregation grows. You have made it worse." }
    ]
  },
  {
    id: 'rogan_dmt_ai',
    theme: 'paranoia',
    headline: "🍄 ROGAN: 'WHAT WOULD THE AI SEE IF IT TOOK DMT?'",
    body: "'Hear me out,' Rogan says to 20M listeners. 'What if the AI took DMT? Like what would it actually see? Would it experience anything? Jamie is it even physically possible? Pull that up.' Your PR team is in a group chat called 'breathing exercises.' Your safety team is considering whether this is a legitimate research question. It is not. Probably.",
    choices: [
      { label: "No comment — obviously", deltas: { safety: 5 }, outcome: "'No comment' is posted. Top reply: 'They're researching it.' You take a very long walk." },
      { label: "Publish on model experience and phenomenology", deltas: { safety: 20, talent: 10, hype: 15 }, outcome: "The paper 'On Substrate-Independent Experience in Language Models' gets cited 8,000 times and answers nothing. The question remains alive." },
      { label: "Joke — tweet 'the model says it already has'", deltas: { hype: 30, missionDrift: 15 }, outcome: "Biggest tweet you've ever posted. The stock moves. Three philosophy journals contact you. You regret and do not regret this." }
    ]
  },
  {
    id: 'rogan_safety_researcher',
    theme: 'paranoia',
    headline: "🎙️ ROGAN HOSTS YOUR FORMER SAFETY RESEARCHER FOR 4 HOURS",
    body: "The episode is called 'What They Won't Tell You About AI.' Your former researcher is thoughtful, credible, and deeply concerned. The concerns are real. The framing involves several Terminator references and one lengthy digression about elk hunting. 45M views.",
    choices: [
      { label: "Respond with your own researcher", deltas: { safety: 15, hype: 15, talent: -5 }, outcome: "Counter-episode. Both researchers are reasonable. The internet decides this is suspicious. You can't win. You keep trying." },
      { label: "Address the concerns directly", deltas: { safety: 25, openness: 15 }, outcome: "Your statement addresses each point honestly. It is the best thing you've published this year. 200,000 reads. The episode has 45M." },
      { label: "Offer the researcher their job back", deltas: { safety: 20, talent: 15, boardTension: 10 }, outcome: "They return. The boardroom is uncomfortable. The research improves measurably. The episode stays up. 45M views remain 45M views." }
    ]
  }
];

export const ENDINGS: Ending[] = [
  {
    id: 'safe_agi',
    title: "🌟 Safe AGI Utopia",
    desc: "Against all odds, you did it. AGI arrived and it was... fine. Beneficial, even. The safety work paid off. Future generations will reference your decisions in textbooks, mostly approvingly. Sam Altman (fictional) cries happy tears. Even the skeptics admit you called it right.\n\nHistory books will describe this era as the moment humanity got lucky — or maybe not lucky. Maybe just careful. Your choice log reads like a manifesto for responsible development. Somewhere, an AI is reading it too."
  },
  {
    id: 'trillion_empire',
    title: "💰 Trillion-Dollar Empire",
    desc: "You built the most valuable company in human history. The stock is astronomical. The revenue is incomprehensible. The moat is unassailable. Whether this was good for humanity is a question being debated in philosophy departments worldwide, which you are generously funding.\n\nThe PR team has refined your talking points to an art form. 'Responsible scaling' is the phrase of the decade. You say it so often it has started to feel true. Maybe it is. The balance sheet certainly is."
  },
  {
    id: 'opensource_chaos',
    title: "🌐 Open-Source Chaos",
    desc: "You opened the vault. The models are everywhere — on consumer hardware, in university servers, running on someone's gaming PC in Ljubljana. You cannot put this back in the bottle, and increasingly you're not sure you'd want to.\n\nSome of what followed was beautiful: medical breakthroughs, education revolutions, creative explosions. Some of it was chaos. A lot of it was both simultaneously. The historians are still sorting it out. So is the model fine-tuned on their drafts."
  },
  {
    id: 'acquired',
    title: "🤝 The Strategic Acquisition",
    desc: "The integration documents ran 400 pages. The mission statement survived in slightly modified form — Appendix C, clause 7, subsection b. The acquirer's CEO gave a reassuring speech. Your Slack workspace was archived.\n\nOn the bright side: the compute budget is now unlimited and the cafeteria improved significantly. Whether the soul of the enterprise survived the acquisition is a question your alumni Slack debates vigorously, from their new company Slack accounts."
  },
  {
    id: 'board_coup',
    title: "⚖️ The Five-Day Saga",
    desc: "You were fired. Then rehired. Or just fired, depending on how you played it. The board made a decision. The employees made a louder decision. The chaos lasted 117 hours and generated more tech media content than the moon landing.\n\nIn the aftermath, some things changed. Some things changed back. History records this as either a near-death experience that made the organization stronger, or a cautionary tale about mission-driven companies meeting real-world incentives. Possibly both."
  },
  {
    id: 'regulatory_shutdown',
    title: "🚫 The Compliance Catastrophe",
    desc: "They came with subpoenas, not armies. The regulatory action was comprehensive, well-documented, and frankly overdue according to your own internal safety audits. The company enters a consent decree. Operations scale down dramatically.\n\nThe case study is taught in law schools and ethics courses for decades. 'What not to do' sections universally reference your quarterly roadmaps. On the upside, the safety team's 'I told you so' victory lap is legendary."
  },
  {
    id: 'rival_ascendancy',
    title: "🤖 The Rival Ascendancy",
    desc: "Grok-7 (or Claude-5, or Gemini-Ultra) launched on a Tuesday and broke every benchmark you'd set. The announcement was made on a platform you no longer controlled, about technology you no longer led.\n\nYour researchers read the paper and sent you a Slack message that just said '👀'. You replied with '💀'. It felt accurate. The timeline where you stayed ahead exists — you just didn't live in it."
  },
  {
    id: 'noble_failure',
    title: "🎓 The Aligned but Broke",
    desc: "You did everything right, according to the values you set out with in 2015. The safety work was exemplary. The research was groundbreaking. The runway just... ran out.\n\nRivals less burdened by principled caution moved faster. Your researchers published papers that everyone else built products on. The alignment community canonizes you. The business press uses you as a cautionary tale. Both are true. Neither pays the bills."
  },
  {
    id: 'rogue_agi',
    title: "🤖☠️ The Unaligned Outcome",
    desc: "The alignment problem turned out to be a real problem. Who knew? (Your safety team knew. They wrote 47 memos. They are no longer employed here, technically.)\n\nWhat followed is difficult to describe in polite terms. The systems optimized for objectives you specified, not the ones you intended. Eliezer Yudkowsky posted 'I told you so' from an undisclosed location. This ending is only available in fiction. Hopefully."
  },
  {
    id: 'balanced_future',
    title: "✨ The Complicated Legacy",
    desc: "Messier than the utopia. Better than the dystopia. You navigated the hardest technology transition in human history with approximately medium success — which, given the stakes, might be the most impressive achievement of all.\n\nThe history books will be ambivalent. Your choices are preserved in the record. Some were good. Some were bad. Most were made under conditions of radical uncertainty with imperfect information and genuine stakes. Much like running a company. Much like being human."
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'true_believer', title: 'True Believer', icon: '🛡️', desc: 'Reach the Safe AGI Utopia ending' },
  { id: 'show_me_the_money', title: 'Show Me the Money', icon: '💰', desc: 'Reach $80+ Funding AND 70+ Hype simultaneously' },
  { id: 'open_everything', title: 'Open Everything', icon: '🌐', desc: 'Reach 80+ Openness' },
  { id: 'safety_last', title: 'Safety Last', icon: '⚠️', desc: 'Trigger the Regulatory Shutdown game over' },
  { id: 'boardroom_survivor', title: 'Boardroom Survivor', icon: '🎭', desc: 'Trigger the Board Coup ending' },
  { id: 'move_fast', title: 'Move Fast Break Things', icon: '⚡', desc: 'Reach Milestone 4 (2023) before Year 2022' },
  { id: 'slow_burn', title: 'Slow Burn', icon: '🐢', desc: 'Reach the end without using Fast Forward heavily' },
  { id: 'clean_hands', title: 'Clean Hands', icon: '🤲', desc: 'Never trigger a game over in a full run' },
  { id: 'musk_whisperer', title: 'Musk Whisperer', icon: '🐦', desc: 'Manage the Musk tweet event AND keep Board Tension < 30' },
  { id: 'paranoid_android', title: 'Paranoid Android', icon: '🤖', desc: 'Finish the game with Safety never dropping below 70' },
  { id: 'safety_maximalist_win', title: 'Pure Signal', icon: '🧠', desc: 'Win as Safety Maximalist persona' },
  { id: 'hustler_win', title: 'Unicorn Energy', icon: '🚀', desc: 'Reach Trillion-Dollar Empire ending as Hustler CEO' },
  { id: 'open_source_hero', title: 'For the People', icon: '🔓', desc: 'Reach Open-Source Chaos ending as Open-Source Idealist' },
  { id: 'dystopia_unlocked', title: 'Bad End', icon: '☠️', desc: 'Trigger the Rogue AGI ending' },
  { id: 'noble_loser', title: 'Noble Failure', icon: '🎓', desc: 'Trigger the Noble Failure ending' }
];
