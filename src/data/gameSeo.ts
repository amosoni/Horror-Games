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

export const gameSeoBySlug: Record<string, GameSeoContent> = {
  'last-seen-online': {
    titleOverride: 'Last Seen Online',
    description: 'A chilling horror game where you investigate the mysterious disappearance of someone who was last seen online.',
    keywords: ['online horror', 'disappearance horror', 'investigation horror', 'digital horror'],
    features: ['Online investigation', 'Digital horror elements', 'Mystery solving', 'Atmospheric tension'],
    howTo: ['Investigate the online presence', 'Follow digital clues', 'Uncover the mystery', 'Survive the horror'],
    faqs: [
      { q: 'What happened to the person?', a: 'That\'s what you need to investigate in this mysterious horror game.' },
      { q: 'Is this about social media?', a: 'The game explores the dark side of online presence and digital footprints.' }
    ],
    overview: 'Last Seen Online is a unique horror experience that explores the terrifying possibilities of digital disappearance and online investigation. The game puts players in the role of someone trying to uncover what happened to a person who vanished from the internet, creating a modern horror scenario that feels all too real in our connected world. Through careful investigation of digital clues, social media posts, and online interactions, players must piece together a story that becomes increasingly disturbing as they dig deeper.',
    story: 'The narrative follows your investigation into the disappearance of someone who was active online but suddenly vanished without a trace. As you dig through their digital footprint, you discover disturbing patterns, strange messages, and evidence that something sinister may have been following them through the internet. The story unfolds through the discovery of digital artifacts, each revealing a piece of a larger, more terrifying puzzle that challenges your understanding of online safety and digital identity.',
    whyPlay: 'Play Last Seen Online if you\'re fascinated by the intersection of technology and horror, or if you\'ve ever wondered about the dark side of our digital lives. It\'s perfect for players who enjoy mystery games and who want to experience horror that feels relevant to modern life. The game\'s focus on digital investigation makes it particularly appealing to players who spend time online and who can relate to the fear of digital vulnerability.',
    tips: 'Pay attention to every digital detail - even small clues can be important. Don\'t rush through the investigation - the horror builds through gradual discovery. Consider the implications of what you find - the real horror often lies in understanding the full picture. Remember that in the digital world, nothing is truly private or safe.'
  },
  'the-anchorite': {
    titleOverride: 'The Anchorite',
    description: 'A contemplative horror game exploring themes of isolation, faith, and psychological terror.',
    keywords: ['contemplative horror', 'isolation horror', 'faith horror', 'psychological horror'],
    features: ['Contemplative gameplay', 'Psychological horror', 'Faith themes', 'Isolation narrative'],
    howTo: ['Immerse yourself in the contemplative atmosphere', 'Explore themes of isolation and faith', 'Experience the psychological horror', 'Reflect on the narrative'],
    faqs: [
      { q: 'What is an anchorite?', a: 'An anchorite is someone who withdraws from society for religious reasons, often living in isolation.' },
      { q: 'Is this a religious game?', a: 'The game explores religious themes but isn\'t necessarily religious in nature.' }
    ],
    overview: 'The Anchorite offers a unique take on horror by combining contemplative gameplay with deep psychological and spiritual themes. Unlike traditional horror games that rely on external threats, this title explores the horror that can arise from internal struggles, isolation, and the search for meaning. The game creates a meditative atmosphere that allows players to reflect on their own experiences while experiencing the narrative\'s horror elements.',
    story: 'The narrative follows the journey of someone who has chosen isolation, exploring the psychological and spiritual implications of this choice. The story unfolds through environmental storytelling, symbolic imagery, and subtle narrative cues that encourage interpretation and reflection. Religious and philosophical themes are woven throughout the experience, creating a rich tapestry of meaning that goes beyond simple horror tropes.',
    whyPlay: 'Play The Anchorite if you\'re interested in horror that goes beyond surface-level scares to explore deeper themes and ideas. It\'s perfect for players who enjoy psychological horror and who want to experience a more contemplative approach to the genre. The game\'s focus on isolation and faith makes it particularly relevant for players who have experienced similar struggles.',
    tips: 'Approach this as a contemplative experience rather than a traditional game. Take time to reflect on the themes and symbolism you encounter. Don\'t rush through the experience - the horror is meant to be contemplated and understood.'
  },
  'syntaxia': {
    titleOverride: 'SYNTAXIA',
    description: 'A horror game that explores the relationship between language, reality, and perception.',
    keywords: ['language horror', 'reality horror', 'perception horror', 'experimental horror'],
    features: ['Language-based mechanics', 'Reality-bending gameplay', 'Perception challenges', 'Experimental horror elements'],
    howTo: ['Engage with the language-based mechanics', 'Question your perception of reality', 'Explore the experimental elements', 'Discover the horror through language'],
    faqs: [
      { q: 'What does "syntaxia" mean?', a: 'It appears to be a combination of "syntax" and "synesthesia," suggesting a blending of language and perception.' },
      { q: 'Is this a puzzle game?', a: 'The game uses language and perception as core mechanics, creating puzzle-like challenges.' }
    ],
    overview: 'SYNTAXIA represents a unique fusion of linguistic theory and horror gaming, creating an experience that challenges players\' understanding of language and reality. The game uses language as both a tool and a weapon, manipulating text and meaning to create disorienting and frightening experiences.',
    story: 'The narrative in SYNTAXIA is deeply intertwined with its linguistic mechanics, creating a story that unfolds through the manipulation and interpretation of language itself. Players must navigate a world where words can change meaning, where syntax can alter reality, and where understanding becomes a survival skill.',
    whyPlay: 'Play SYNTAXIA if you\'re interested in experimental horror that challenges conventional gaming mechanics and storytelling. It\'s perfect for players who enjoy intellectual challenges and who want to experience horror that operates on multiple levels.',
    tips: 'Pay close attention to language and how it changes throughout the experience. Don\'t take text at face value - meanings can shift and evolve. Experiment with different interpretations of the language you encounter.'
  },
  'midnight-mansion': {
    titleOverride: 'Midnight Mansion',
    description: 'Explore a haunted mansion in this atmospheric horror game filled with supernatural encounters.',
    keywords: ['haunted mansion', 'exploration horror', 'supernatural horror', 'atmospheric horror'],
    features: ['Mansion exploration', 'Supernatural encounters', 'Atmospheric horror', 'Environmental storytelling'],
    howTo: ['Explore the mansion carefully', 'Investigate supernatural phenomena', 'Immerse yourself in the atmosphere', 'Discover the mansion\'s secrets'],
    faqs: [
      { q: 'Is this like other haunted house games?', a: 'While it uses familiar tropes, it has its own unique atmosphere and approach.' },
      { q: 'How scary is it?', a: 'The horror is atmospheric and psychological rather than relying on jump scares.' }
    ],
    overview: 'Midnight Mansion takes the classic haunted house setting and infuses it with modern horror sensibilities and atmospheric storytelling. The game creates a sense of dread through environmental design, sound design, and the gradual revelation of the mansion\'s dark history.',
    story: 'The narrative unfolds through exploration of the mansion and discovery of its various rooms, each revealing different aspects of the building\'s haunted past. Players piece together the story through environmental details, found objects, and supernatural encounters.',
    whyPlay: 'Play Midnight Mansion if you enjoy atmospheric horror and exploration-based gameplay. It\'s perfect for players who appreciate haunted house settings and who want to experience horror through discovery rather than combat.',
    tips: 'Explore thoroughly - important story elements are often hidden in less obvious locations. Pay attention to environmental details and changes - the mansion responds to your presence. Don\'t rush through areas - the atmosphere is meant to be experienced slowly.'
  },
  'descent': {
    titleOverride: 'Descent',
    description: 'Experience a psychological descent into darkness in this atmospheric horror game.',
    keywords: ['psychological horror', 'descent horror', 'dark atmosphere', 'psychological descent'],
    features: ['Psychological horror', 'Dark atmosphere', 'Descent narrative', 'Atmospheric storytelling'],
    howTo: ['Experience the psychological descent', 'Immerse yourself in the dark atmosphere', 'Navigate the psychological elements', 'Discover the horror within'],
    faqs: [
      { q: 'What kind of descent is this?', a: 'This is a psychological and metaphorical descent into darkness and horror.' },
      { q: 'Is it very dark?', a: 'The game uses darkness both literally and metaphorically to create its horror atmosphere.' }
    ],
    overview: 'Descent offers a unique take on psychological horror by structuring the entire experience around the concept of descending - both literally and metaphorically. The game creates a sense of increasing darkness and danger as players progress deeper into its world, mirroring the psychological journey of the protagonist.',
    story: 'The narrative follows a character\'s journey into increasingly dark and dangerous territory, both literally and psychologically. The story unfolds through environmental changes, atmospheric shifts, and the gradual revelation of the character\'s deteriorating mental state.',
    whyPlay: 'Play Descent if you enjoy psychological horror that uses metaphor and symbolism to create its effects. It\'s perfect for players who appreciate atmospheric horror and who want to experience a more intellectual approach to the genre.',
    tips: 'Pay attention to the changes in atmosphere and environment as you progress - they reflect the psychological journey. Don\'t rush through the experience - the horror builds through gradual revelation. Consider the metaphorical meaning of the descent.'
  },
  'teeth-of-glass': {
    titleOverride: 'Teeth of Glass',
    description: 'A fragile horror experience exploring themes of vulnerability, strength, and the delicate nature of existence.',
    keywords: ['fragile horror', 'vulnerability horror', 'glass metaphor', 'delicate horror'],
    features: ['Fragile mechanics', 'Vulnerability themes', 'Glass metaphor', 'Delicate horror experience'],
    howTo: ['Experience the fragile nature of the game', 'Explore themes of vulnerability', 'Understand the glass metaphor', 'Navigate the delicate horror'],
    faqs: [
      { q: 'What does "teeth of glass" mean?', a: 'It\'s a metaphor suggesting fragility and the dangerous nature of vulnerability.' },
      { q: 'Is this a gentle horror game?', a: 'While it explores vulnerability, it still contains traditional horror elements.' }
    ],
    overview: 'Teeth of Glass represents a unique approach to horror by centering its experience around the concept of fragility and vulnerability. The game uses the metaphor of glass teeth to explore themes of strength, weakness, and the delicate balance between them.',
    story: 'The narrative explores the relationship between strength and vulnerability through the metaphor of glass teeth - beautiful and dangerous, strong yet fragile. The story unfolds through symbolic imagery and metaphorical storytelling.',
    whyPlay: 'Play Teeth of Glass if you\'re interested in horror that explores deeper emotional and psychological themes. It\'s perfect for players who appreciate metaphorical storytelling and who want to experience horror that operates on multiple levels.',
    tips: 'Pay attention to the metaphorical elements - the glass teeth represent deeper themes. Don\'t rush through the experience - the fragility is meant to be contemplated. Consider how the themes of vulnerability and strength relate to your own experiences.'
  },
  'the-forest': {
    titleOverride: 'The Forest',
    description: 'Navigate through a mysterious forest filled with supernatural horrors and ancient secrets.',
    keywords: ['forest horror', 'supernatural horror', 'ancient secrets', 'nature horror'],
    features: ['Forest exploration', 'Supernatural encounters', 'Ancient mysteries', 'Environmental horror'],
    howTo: ['Explore the forest carefully', 'Uncover ancient secrets', 'Survive supernatural threats', 'Discover the forest\'s history'],
    faqs: [
      { q: 'What kind of forest is this?', a: 'This is no ordinary forest - it contains supernatural elements and ancient secrets.' },
      { q: 'Are there monsters?', a: 'The forest is home to various supernatural entities and ancient horrors.' }
    ],
    overview: 'The Forest creates a unique horror experience by setting the action in a seemingly peaceful natural environment that gradually reveals its dark and supernatural nature. The game explores the fear of the unknown that lurks in natural places, combining environmental storytelling with supernatural horror elements.',
    story: 'The narrative unfolds as you discover that the forest you\'re exploring is not what it seems. Ancient secrets, supernatural entities, and dark rituals have left their mark on this place, creating a story that combines natural horror with supernatural elements.',
    whyPlay: 'Play The Forest if you enjoy horror that uses natural settings to create fear, or if you\'re interested in stories that blend ancient mysteries with supernatural horror. It\'s perfect for players who appreciate environmental storytelling and atmospheric horror.',
    tips: 'Pay attention to environmental details - the forest itself tells a story. Don\'t trust what you see - appearances can be deceiving in this supernatural forest. Explore thoroughly to uncover the ancient secrets hidden within.'
  },
  'the-cellar': {
    titleOverride: 'The Cellar',
    description: 'Descend into a dark cellar where forgotten horrors and family secrets await discovery.',
    keywords: ['cellar horror', 'family secrets', 'forgotten horrors', 'underground horror'],
    features: ['Cellar exploration', 'Family mystery', 'Underground horror', 'Psychological tension'],
    howTo: ['Descend into the cellar', 'Investigate family secrets', 'Uncover forgotten horrors', 'Survive the darkness'],
    faqs: [
      { q: 'What\'s in the cellar?', a: 'The cellar contains family secrets and forgotten horrors that have been hidden for years.' },
      { q: 'Is this about a family?', a: 'Yes, the game explores dark family secrets and the horrors that can be hidden within families.' }
    ],
    overview: 'The Cellar explores the horror that can lurk in familiar places, specifically the dark corners of family homes where secrets are buried. The game creates tension through the gradual revelation of family mysteries and the discovery of horrors that have been hidden for generations.',
    story: 'The narrative follows your investigation into a family cellar that has been sealed for years. As you descend deeper into the darkness, you uncover family secrets, forgotten tragedies, and horrors that have been buried with the passage of time.',
    whyPlay: 'Play The Cellar if you enjoy horror that explores family dynamics and hidden secrets, or if you\'re interested in stories that reveal the dark side of seemingly normal family life. It\'s perfect for players who appreciate psychological horror and mystery elements.',
    tips: 'Pay attention to family history and relationships - they often hold the key to understanding the horrors you encounter. Don\'t rush through the exploration - the cellar\'s secrets are revealed gradually. Remember that family secrets can be the most terrifying of all.'
  },
  'the-attic': {
    titleOverride: 'The Attic',
    description: 'Climb into a mysterious attic where childhood memories and adult horrors collide.',
    keywords: ['attic horror', 'childhood memories', 'adult horrors', 'memory horror'],
    features: ['Attic exploration', 'Memory-based horror', 'Psychological elements', 'Childhood trauma'],
    howTo: ['Climb into the attic', 'Explore childhood memories', 'Confront adult horrors', 'Reconcile past and present'],
    faqs: [
      { q: 'What\'s in the attic?', a: 'The attic contains childhood memories and the adult horrors that have grown from them.' },
      { q: 'Is this about growing up?', a: 'The game explores the relationship between childhood innocence and adult understanding of horror.' }
    ],
    overview: 'The Attic creates a unique horror experience by exploring the relationship between childhood memories and adult understanding of horror. The game uses the attic as a metaphor for the mind\'s storage of memories and the way childhood experiences can take on new, horrifying meanings as we grow older.',
    story: 'The narrative unfolds as you explore an attic filled with childhood memories, only to discover that these innocent memories have taken on horrifying new meanings. The story explores themes of growing up, losing innocence, and the way our understanding of the world changes over time.',
    whyPlay: 'Play The Attic if you\'re interested in horror that explores the relationship between childhood and adulthood, or if you enjoy stories that reveal how our perspective on the past can change. It\'s perfect for players who appreciate psychological horror and coming-of-age themes.',
    tips: 'Pay attention to how your understanding of childhood memories changes as you explore. Don\'t dismiss seemingly innocent items - they may have darker meanings. Consider how growing up changes our perception of what\'s scary.'
  },
  'the-basement': {
    titleOverride: 'The Basement',
    description: 'Venture into a dark basement where the foundations of horror are literally built into the structure.',
    keywords: ['basement horror', 'foundation horror', 'structural horror', 'underground terror'],
    features: ['Basement exploration', 'Structural horror', 'Foundation mysteries', 'Architectural terror'],
    howTo: ['Descend into the basement', 'Investigate the foundations', 'Uncover structural secrets', 'Survive the architectural horror'],
    faqs: [
      { q: 'What\'s wrong with the basement?', a: 'The basement contains structural secrets and horrors that are literally built into the foundation.' },
      { q: 'Is this about architecture?', a: 'The game uses architectural elements and structural design to create horror.' }
    ],
    overview: 'The Basement explores the horror that can be built into the very structure of buildings, specifically the foundations and support systems that we usually take for granted. The game creates fear through the discovery that the building itself may be designed to house horrors.',
    story: 'The narrative reveals that the basement you\'re exploring was designed with a dark purpose. As you investigate the foundations and structural elements, you discover that the building\'s architecture serves a horrifying function that goes beyond normal construction.',
    whyPlay: 'Play The Basement if you enjoy horror that uses architectural and structural elements to create fear, or if you\'re interested in stories that reveal how buildings can be designed for dark purposes. It\'s perfect for players who appreciate environmental horror and architectural storytelling.',
    tips: 'Pay attention to architectural details and structural elements - they often reveal the building\'s true purpose. Don\'t trust the building\'s design - it may have been created to serve dark ends. Remember that the most terrifying horrors are often built into the very foundations.'
  },
  'the-garden': {
    titleOverride: 'The Garden',
    description: 'Explore a beautiful garden where nature\'s beauty masks supernatural horrors and ancient curses.',
    keywords: ['garden horror', 'nature horror', 'supernatural garden', 'ancient curses'],
    features: ['Garden exploration', 'Natural beauty', 'Supernatural elements', 'Ancient magic'],
    howTo: ['Explore the garden paths', 'Discover supernatural elements', 'Uncover ancient curses', 'Survive nature\'s dark side'],
    faqs: [
      { q: 'What\'s wrong with the garden?', a: 'The garden\'s beauty masks supernatural horrors and ancient curses that have taken root.' },
      { q: 'Is this about nature?', a: 'The game explores the dark side of nature and the supernatural forces that can corrupt natural beauty.' }
    ],
    overview: 'The Garden creates a unique horror experience by contrasting natural beauty with supernatural corruption. The game explores the idea that even the most beautiful natural spaces can harbor dark secrets and ancient curses that have taken root over time.',
    story: 'The narrative unfolds as you explore a seemingly beautiful garden, only to discover that supernatural forces and ancient curses have corrupted the natural beauty. The story explores themes of nature\'s duality and the way beauty can mask darkness.',
    whyPlay: 'Play The Garden if you enjoy horror that uses natural settings to create fear, or if you\'re interested in stories that explore the supernatural corruption of natural beauty. It\'s perfect for players who appreciate environmental horror and supernatural elements.',
    tips: 'Don\'t be fooled by surface beauty - the garden\'s true nature lies beneath. Pay attention to natural elements that seem out of place or corrupted. Remember that ancient curses can take root in the most beautiful of places.'
  },
  'the-library': {
    titleOverride: 'The Library',
    description: 'Navigate through a vast library where knowledge itself becomes a source of horror and forbidden wisdom.',
    keywords: ['library horror', 'knowledge horror', 'forbidden wisdom', 'intellectual horror'],
    features: ['Library exploration', 'Knowledge-based horror', 'Forbidden books', 'Intellectual terror'],
    howTo: ['Explore the library shelves', 'Discover forbidden knowledge', 'Navigate intellectual horrors', 'Survive the pursuit of wisdom'],
    faqs: [
      { q: 'What\'s wrong with the library?', a: 'The library contains forbidden knowledge and wisdom that can drive people mad.' },
      { q: 'Is this about books?', a: 'The game explores the horror that can come from pursuing forbidden knowledge and wisdom.' }
    ],
    overview: 'The Library explores the horror that can come from the pursuit of knowledge, specifically forbidden wisdom that should remain hidden. The game creates fear through the discovery that some knowledge is too dangerous to possess and can lead to madness or worse.',
    story: 'The narrative follows your exploration of a vast library filled with books containing forbidden knowledge and ancient wisdom. As you discover more dangerous information, you realize that the pursuit of knowledge itself can be a path to horror and madness.',
    whyPlay: 'Play The Library if you enjoy horror that explores intellectual themes and the pursuit of knowledge, or if you\'re interested in stories that reveal how wisdom can become a curse. It\'s perfect for players who appreciate intellectual horror and philosophical themes.',
    tips: 'Be careful what knowledge you seek - some wisdom is better left undiscovered. Pay attention to the warnings in ancient texts - they often contain important information about dangers. Remember that the pursuit of knowledge can lead to places you don\'t want to go.'
  },
  'the-freak-circus': {
    titleOverride: 'The Freak Circus',
    description: 'A disturbing circus-themed horror experience that explores the dark side of entertainment and human nature.',
    keywords: ['circus horror', 'freak show horror', 'entertainment horror', 'disturbing horror'],
    features: ['Circus atmosphere', 'Disturbing visuals', 'Psychological horror', 'Browser-based gameplay'],
    howTo: ['Enter the circus environment', 'Explore the disturbing atmosphere', 'Experience the psychological horror', 'Navigate the twisted entertainment'],
    faqs: [
      { q: 'What makes this circus scary?', a: 'The circus combines disturbing visuals with psychological horror elements to create an unsettling atmosphere.' },
      { q: 'Is this about real circus performers?', a: 'The game uses circus themes metaphorically to explore deeper horror concepts.' }
    ],
    overview: 'The Freak Circus creates a unique horror experience by setting the action in a twisted circus environment where entertainment becomes a source of terror. The game explores the dark side of human curiosity and the horror that can lurk behind the facade of amusement.',
    story: 'The narrative unfolds as you explore a circus that has been corrupted by dark forces. What was once a place of wonder and entertainment has become a twisted reflection of human fears and desires. The story explores themes of exploitation, curiosity, and the price of entertainment.',
    whyPlay: 'Play The Freak Circus if you enjoy atmospheric horror that uses familiar settings in disturbing ways, or if you\'re interested in stories that explore the dark side of entertainment. It\'s perfect for players who appreciate psychological horror and symbolic storytelling.',
    tips: 'Pay attention to the circus atmosphere - it\'s designed to unsettle and disturb. Don\'t rush through the experience - the horror builds through environmental details. Consider what the circus represents metaphorically in terms of human nature.'
  },
  'flesh-blood-concrete': {
    titleOverride: 'Flesh, Blood, & Concrete',
    description: 'An urban horror vignette that explores the dark side of city life and human existence.',
    keywords: ['urban horror', 'city horror', 'human nature horror', 'vignette horror'],
    features: ['Urban setting', 'Human nature exploration', 'Short horror experience', 'Atmospheric storytelling'],
    howTo: ['Immerse yourself in the urban environment', 'Explore the dark themes', 'Experience the atmospheric horror', 'Reflect on the narrative'],
    faqs: [
      { q: 'What does the title mean?', a: 'The title represents the contrast between human life (flesh, blood) and the cold urban environment (concrete).' },
      { q: 'Is this about city life?', a: 'The game explores the horror that can exist within urban environments and human nature.' }
    ],
    overview: 'Flesh, Blood, & Concrete offers a unique take on urban horror by exploring the relationship between human nature and the modern city environment. The game creates a sense of dread through its atmospheric portrayal of urban life and the dark aspects of human existence.',
    story: 'The narrative unfolds as a vignette that explores the intersection of human life and urban decay. The story examines themes of isolation, alienation, and the horror that can exist within seemingly normal city environments. Through atmospheric storytelling, players experience the dark side of urban existence.',
    whyPlay: 'Play Flesh, Blood, & Concrete if you\'re interested in horror that explores modern urban life and human nature, or if you enjoy atmospheric storytelling that creates mood through environment and theme. It\'s perfect for players who appreciate psychological horror and urban settings.',
    tips: 'Pay attention to the urban atmosphere - the city itself is a character in the story. Don\'t rush through the experience - the horror is meant to be contemplated. Consider how the urban environment reflects human nature and vice versa.'
  },
  'exhibit-of-sorrows': {
    titleOverride: 'Exhibit of Sorrows',
    description: 'A twisted horror exhibit that challenges your perception of art and reality.',
    keywords: ['exhibit horror', 'art horror', 'perception horror', 'twisted art'],
    features: ['Art exhibit setting', 'Perception challenges', 'Psychological horror', 'Interactive elements'],
    howTo: ['Enter the exhibit space', 'Explore the twisted artwork', 'Challenge your perceptions', 'Experience the psychological horror'],
    faqs: [
      { q: 'What kind of exhibit is this?', a: 'This is a horror-themed art exhibit that challenges your perception of reality and art.' },
      { q: 'Is this about real art?', a: 'The game uses art and exhibit themes to explore horror concepts and perception.' }
    ],
    overview: 'Exhibit of Sorrows creates a unique horror experience by setting the action in a twisted art exhibit where perception and reality become blurred. The game explores the horror that can exist within art and the way our minds interpret what we see.',
    story: 'The narrative unfolds as you explore an art exhibit that has been corrupted by dark forces. What appears to be a normal art display gradually reveals its true nature as a collection of horrors and sorrows. The story explores themes of perception, reality, and the power of art to disturb and unsettle.',
    whyPlay: 'Play Exhibit of Sorrows if you enjoy horror that challenges your perception of reality, or if you\'re interested in stories that explore the relationship between art and horror. It\'s perfect for players who appreciate psychological horror and artistic themes.',
    tips: 'Question what you see - not everything in the exhibit is what it appears to be. Pay attention to how your perception changes as you explore. Don\'t trust your initial impressions - the horror often lies in the details.'
  },
  '10-minutes-till-dawn': {
    titleOverride: '10 Minutes Till Dawn',
    description: 'Survive for exactly 10 minutes in this intense action-packed survival horror game.',
    keywords: ['survival horror', 'action horror', 'time-based horror', 'intense gameplay'],
    features: ['10-minute survival challenge', 'Action-packed gameplay', 'Survival mechanics', 'Intense horror atmosphere'],
    howTo: ['Start the 10-minute countdown', 'Survive the horror onslaught', 'Use your skills and weapons', 'Make it to dawn'],
    faqs: [
      { q: 'Why exactly 10 minutes?', a: 'The 10-minute time limit creates intense pressure and urgency, making every second count.' },
      { q: 'Is this a short game?', a: 'Each session is 10 minutes, but the game is designed for multiple playthroughs with different strategies.' }
    ],
    overview: '10 Minutes Till Dawn offers a unique take on survival horror by imposing a strict 10-minute time limit that creates intense pressure and urgency. The game combines action gameplay with survival horror elements, creating an experience where every second counts and every decision matters.',
    story: 'The narrative is simple but effective - you must survive for exactly 10 minutes until dawn breaks. The story unfolds through the intense gameplay experience, where the horror comes from the constant threat of death and the pressure of the time limit. Each playthrough tells a different story of survival.',
    whyPlay: 'Play 10 Minutes Till Dawn if you enjoy intense, action-packed horror games, or if you want to experience the pressure of time-based survival challenges. It\'s perfect for players who appreciate fast-paced gameplay and who want to test their skills under pressure.',
    tips: 'Every second counts - don\'t waste time on unnecessary actions. Learn from each death - the game is designed for multiple playthroughs. Stay mobile and keep moving - standing still is often deadly in this game.'
  },
  'crusty-proto': {
    titleOverride: 'Crusty Proto',
    description: 'An experimental horror prototype that pushes the boundaries of visual style and gameplay.',
    keywords: ['experimental horror', 'prototype horror', 'unique visuals', 'innovative gameplay'],
    features: ['Experimental gameplay', 'Unique visual style', 'Prototype mechanics', 'Innovative horror elements'],
    howTo: ['Experience the experimental gameplay', 'Adapt to unique mechanics', 'Explore the innovative elements', 'Embrace the prototype nature'],
    faqs: [
      { q: 'What does "crusty proto" mean?', a: 'It suggests this is a rough, experimental prototype with a unique, possibly unsettling visual style.' },
      { q: 'Is this a finished game?', a: 'This is an experimental prototype designed to test new ideas and mechanics.' }
    ],
    overview: 'Crusty Proto represents the cutting edge of experimental horror gaming, offering players a chance to experience innovative mechanics and unique visual styles that push the boundaries of what horror games can be. The game\'s prototype nature allows for creative experimentation and unconventional approaches to horror.',
    story: 'The narrative in Crusty Proto is intentionally experimental and unconventional, designed to challenge players\' expectations of what a horror game should be. The story unfolds through the innovative gameplay mechanics and unique visual elements, creating an experience that feels fresh and unpredictable.',
    whyPlay: 'Play Crusty Proto if you\'re interested in experimental horror that pushes boundaries, or if you want to experience innovative gameplay mechanics and visual styles. It\'s perfect for players who enjoy unconventional gaming experiences and who want to see the future of horror gaming.',
    tips: 'Embrace the experimental nature - don\'t expect traditional horror game conventions. Be open to new mechanics and visual styles. Don\'t judge the game by traditional standards - it\'s designed to be different and innovative.'
  },
  'arsonate': {
    titleOverride: 'ARSONATE',
    description: 'A multiplayer horror demo that explores the dark side of human nature and cooperation.',
    keywords: ['multiplayer horror', 'demo horror', 'cooperation horror', 'human nature horror'],
    features: ['Multiplayer gameplay', 'Cooperation mechanics', 'Atmospheric horror', 'Demo experience'],
    howTo: ['Join the multiplayer session', 'Cooperate with other players', 'Survive the horror together', 'Experience the atmospheric gameplay'],
    faqs: [
      { q: 'What does "arsonate" mean?', a: 'The title suggests themes of destruction and transformation, possibly related to fire or change.' },
      { q: 'Is this a full game?', a: 'This is a demo that showcases the multiplayer horror concept and mechanics.' }
    ],
    overview: 'ARSONATE offers a unique multiplayer horror experience that explores the dark side of human nature and the challenges of cooperation under pressure. The game creates tension through its atmospheric horror elements and the need for players to work together while facing terrifying threats.',
    story: 'The narrative unfolds through the multiplayer experience, where the horror comes not just from external threats but also from the challenges of cooperation and trust between players. The story explores themes of human nature, survival, and the way people behave under extreme pressure.',
    whyPlay: 'Play ARSONATE if you enjoy multiplayer horror games, or if you want to experience the unique challenges of cooperative survival in a horror setting. It\'s perfect for players who appreciate atmospheric horror and who enjoy the social dynamics of multiplayer gaming.',
    tips: 'Communication is key - work with your teammates to survive. Trust but verify - cooperation is essential but be aware of the game\'s potential for betrayal. Pay attention to the atmospheric elements - they often provide important clues about threats and objectives.'
  }
}; 