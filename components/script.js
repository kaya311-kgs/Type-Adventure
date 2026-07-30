
// --- CENTRAL ENGINE GAME STATE ---
const gameState = {
    cleverness: 10,
    chaos: 0,
    sockKarma: 5,
    inventory: ["Magical Sock Lint", "5 Gold Coins", "Permission Slip from Reality"]
};

// --- FULL NARRATIVE GRAPH ENGINE ---
const storyNodes = {
    intro: {
        title: "THE WIZARD'S UPSIDE-DOWN TOWER",
        speaker: "Arch-Wizard Pimblepants",
        dialogue: "✨ The Wizard's Lost Socks: Ultra Wonderful & Chaotic Edition ✨\n\nYou wake up to a chicken falling directly onto your head. It is Tuesday. But it is also Wednesday. The Arch-Wizard’s tower is upside down, and purple sparkles leak from the stone walls.\n\nArch-Wizard Pimblepants floats past, hovering 3 feet up. He is furious, completely barefoot, and his toes are glowing bright neon green.\n\n'BLOODY SOCKS!' he screams. 'THE REALITY SOCKS ARE GONE! Find them, Intern, or we’re all doomed to live in a musical!'\n\nHe points a shaky finger at 3 glowing lint trails:",
        image: "assets/castle.png",
        choices: [
            { text: "Investigate the Kitchen", target: "kitchen" },
            { text: "Inspect Dragon's Laundry Room", target: "laundry" },
            { text: "Ask the Talking Hat", target: "hat" }
        ]
    },

    // --- PATH A: KITCHEN ---
    kitchen: {
        title: "THE SINGING KITCHEN",
        image: "assets/kitchen.jpg",
        speaker: "Toaster Spy",
        dialogue: "🍳 --- PATH A: THE KITCHEN ---\nThe kitchen is absolute chaos. The tomato soup on the stove is aggressively singing Italian opera. The refrigerator is terrified and hiding behind the dry goods pantry.\n\nOn the counter sits a single sock—made entirely of freshly baked sourdough bread. Next to it, written in strawberry jam: 'TOOK THE REAL ONES - LOVE, G.'\n\nSuddenly, the toaster pops up like a spy. 'G was here,' it whispers. 'She went to trade them for a pet rock.'",
        action: () => { addInventory("Bread Sock"); },
        choices: [
            { text: "Chase G into the courtyard", target: "courtyard_start", message: "You sprint out into the courtyard tracking G's jam crumbs!", stats: { chaos: 1 } },
            { text: "Eat the bread sock", target: "kitchen_eat", message: "You take a massive bite out of the structural footwear.", stats: { chaos: 2, sockKarma: -2 } },
            { text: "Interrogate the toaster", target: "kitchen_toaster", message: "You slam your hands down. 'Talk, you chrome box!'", stats: { cleverness: 2 } }
        ]
    },
    kitchen_eat: {
        title: "THE YEASTEN REALITY",
        speaker: "Intern",
        dialogue: "🍞 It tastes like active yeast mixed with floral fabric softener. Your teeth turn bright neon blue and your stomach starts making dial-up internet sounds.\n\nThe singing soup hits an incredibly high note, breaking the spice rack. The toaster points out the back door toward the courtyard.",
        choices: [
            { text: "Chase G into the courtyard", target: "courtyard_start" }
        ]
    },
    kitchen_toaster: {
        title: "THE GRAVY BOAT PORTAL",
        speaker: "Toaster Spy",
        dialogue: "🤖 The toaster trembles, rattling its crumb tray in fear.\n\n'Okay! Okay! She used a Gravy Boat Portal!' it squeaks. 'But she accidentally dropped her map. She ran into the Forest of Bad Decisions!'",
        action: () => { addInventory("Crumpled Forest Map"); },
        choices: [
            { text: "Head to the Forest of Bad Decisions", target: "forest_start" }
        ]
    },

    // --- PATH B: LAUNDRY ---
    laundry: {
        title: "DRAGON'S LAUNDRY ROOM",
        image: "assets/dragon-sock.jpg",
        speaker: "Sir Snores-a-lot",
        dialogue: "🧺 --- PATH B: THE DRAGON'S LAUNDRY ROOM ---\nSir Snores-a-lot the Dragon runs the castle laundry. He has 47 mismatched socks pulled onto his spiked tail.\n\n'OH THANK THE GODS,' he booms, puffing an anxious cloud of dark steam. 'Have you seen the Arch-Wizard’s socks? I accidentally washed them with my fireproof underwear and now they’re... quantum.'\n\nHe flings open a dryer. Inside is a spinning miniature cosmic portal. You hear faint giggling.",
        choices: [
            { text: "Jump straight into the portal", target: "linterverse_start", message: "You dive headfirst into the tumbling vortex!", stats: { chaos: 3 } },
            { text: "Ask about G", target: "laundry_ask_g", message: "You ask if anyone else has been snooping around.", stats: { cleverness: 1 } },
            { text: "Tip dragon 5 gold coins", target: "laundry_tipped", message: "You hand over your cold cash.", stats: { sockKarma: 4 } }
        ]
    },
    laundry_ask_g: {
        title: "DRAGON'S INTEL",
        speaker: "Sir Snores-a-lot",
        dialogue: "🐉 'G?' the dragon scratches his neck scales. 'Yeah, she came in trying to dry a bunch of counterfeit gold. When I said no, she screamed something about finding herself and ran off toward the dense woods outside.'",
        choices: [
            { text: "Jump into the portal anyway", target: "linterverse_start", stats: { chaos: 2 } },
            { text: "Head out to the Forest of Bad Decisions", target: "forest_start" }
        ]
    },
    laundry_tipped: {
        title: "STATIC SHIELD ACQUIRED",
        speaker: "Sir Snores-a-lot",
        dialogue: "🪙 The dragon safely slips the 5 gold coins into his flame-proof apron pockets.\n\n'You're a great kid, Intern. Take this,' he says, handing you a glowing sheet. 'It's an industrial anti-static shield sheet. It will keep your atomic structure bound together if things get weird.'",
        action: () => { handleDragonTip(); },
        choices: [
            { text: "Jump into the portal with your shield", target: "linterverse_start" },
            { text: "Head toward the Forest instead", target: "forest_start" }
        ]
    },

    // --- PATH C: TALKING HAT ---
    hat: {
        title: "THE DUSTY SHELF",
        speaker: "The Talking Hat",
        dialogue: "🎩 --- PATH C: ASK THE TALKING HAT ---\nThe Talking Hat sits on a dusty shelf, living for theatrical drama.\n\n'I SAW EVERYTHING!' it declares, tipping its brim forward. 'The socks were stolen by G! She’s the Wizard’s disgruntled ex-apprentice. She yelled: 'If I can’t have magic, no one can!' and left to hide out in the Forest of Bad Decisions.'\n\nThe hat leans down close. 'P.S. I am actually the socks. Cursed by a stray spell. Don't tell Pimblepants.'",
        choices: [
            { text: "Tell the Arch-Wizard the truth", target: "hat_snitch", message: "You turn around and yell the truth to the Arch-Wizard!", stats: { sockKarma: -3, chaos: 2 } },
            { text: "Keep the hat's secret", target: "hat_secret", message: "You wink at the headwear.", stats: { sockKarma: 3 } },
            { text: "Put the hat on your head", target: "hat_equip", message: "You slap the dramatic hat directly onto your head.", stats: { chaos: 2 } }
        ]
    },
    hat_snitch: {
        title: "TOWER CHAOS",
        speaker: "Arch-Wizard Pimblepants",
        dialogue: "🧙‍♂️ Pimblepants gasps! 'MY FOOT COVERS!' He charges forward, grabs the screaming Talking Hat, and aggressively forces it onto his bare left foot.\n\nThe localized magic instantly warps. The entire tower spins on its side. You slide down the wall, tumbling straight out an open window and falling downward into the Courtyard!",
        choices: [
            { text: "Land in the Courtyard", target: "courtyard_start" }
        ]
    },
    hat_secret: {
        title: "LINT RADAR",
        speaker: "The Talking Hat",
        dialogue: "🤫 'Thank cotton!' the hat sighs in relief. 'Listen, G left a tracking device on the table. It tracks sock lint energy. Take it and go find where she went!'",
        action: () => { addInventory("Lint Radar"); },
        choices: [
            { text: "Track the radar to the Forest", target: "forest_start" }
        ]
    },
    hat_equip: {
        title: "PSYCHIC SEAMS",
        speaker: "The Talking Hat",
        dialogue: "🧠 The moment the brim touches your hair, you hear its inner thoughts blasting inside your skull: 'OH MAN MY SEAMS ARE FLOATING! ARE WE SECURE? WHO IS THAT GREEN FROG OUTSIDE?'\n\nYou look out the window. A judgmental frog in a tiny trench coat is staring at you. It jumps down toward the courtyard.",
        action: () => { addInventory("Anxious Talking Hat (Equipped)"); },
        choices: [
            { text: "Chase the frog into the courtyard", target: "courtyard_start" }
        ]
    },

    // === CHAPTER 2 BRANCHES ===
    courtyard_start: {
        title: "COURTYARD OF CHEESE",
        speaker: "Judgmental Frog",
        dialogue: "🏰 --- CHAPTER 2: CHAOS IN THE COURTYARD ---\nYou drop into the courtyard. It is heavily raining sharp cheddar cheese chunks. The castle walls are doing active gymnastics.\n\nThere is G! She is running across the lawn holding a sparking container. Suddenly, a Judgmental Frog in a tiny trench coat hops in front of you, holding out a tiny stop sign.\n\n'HALT!' the frog croaks. 'Interdimensional traffic laws prohibit running during dairy downpours!'",
        choices: [
            { text: "Bribe frog with Magical Sock Lint", target: "courtyard_bribe", stats: { cleverness: 1 } },
            { text: "Eat the cheddar rain", target: "courtyard_eat", stats: { chaos: 2 } },
            { text: "Build a Grilled Reality Sandwich", target: "courtyard_sandwich" }
        ]
    },
    courtyard_bribe: {
        title: "TACTICAL BRIBE",
        speaker: "Intern",
        dialogue: "🐸 You toss a pinch of Magical Sock Lint at the frog. It sniffs it, gasps, and gets instantly distracted trying to organize the lint by color.\n\nYou sprint past him and tackle G into a pile of soft cheese! The container flies open, releasing the Right Sock of Reality!",
        action: () => { addInventory("The Right Sock"); },
        choices: [
            { text: "Grab the sock and complete mission", target: "win_screen" }
        ]
    },
    courtyard_eat: {
        title: "CHEESE LOCK",
        speaker: "Narrator",
        dialogue: "🧀 You open your mouth wide and swallow four pounds of high-velocity courtyard cheddar. You are now too heavy to move.\n\nG looks back, laughs mockingly, and uses the left sock to turn your shoes into two small, jazz-singing hamsters. You have entered a state of complete stasis.",
        choices: [
            { text: "Try Again", target: "intro", reset: true }
        ]
    },
    courtyard_sandwich: {
        title: "GRILLED REALITY",
        speaker: "Narrator",
        dialogue: "🥪 ERROR / SUCCESS: You check your inventory. You have a Bread Sock and it's raining cheese! You combine them to create the Grilled Reality Sandwich!\n\nThe sandwich emits an energy blast so powerful it stops the castle from doing cartwheels and freezes G in her tracks.",
        action: () => { addInventory("The Right Sock"); },
        choices: [
            { text: "Take the sock from frozen G", target: "win_screen" }
        ]
    },

    linterverse_start: {
        title: "QUANTUM LINT COSMOS",
        speaker: "Lint Overlord",
        dialogue: "🌀 --- CHAPTER 2: THE QUANTUM LINT COSMOS ---\nYou tumble out of space-time and land softly in a dimension made entirely of neon-pink carpet fiber.\n\nStanding before you on a tiny unicycle is the Lint Overlord—a giant, fluffy dust bunny wearing the Arch-Wizard's left sock over its head like a crown.\n\n'To pass,' the Overlord squeaks fiercely, 'you must defeat me in a game of Cosmic Rock-Paper-Scissors, or be spun into a pair of beige trousers!'",
        choices: [
            { text: "Challenge Overlord to game", target: "linterverse_game" },
            { text: "Activate anti-static shield", target: "linterverse_shield" },
            { text: "Blast with handful of lint", target: "linterverse_blast", stats: { chaos: 1 } }
        ]
    },
    linterverse_game: {
        title: "KHAKI FATE",
        speaker: "Narrator",
        dialogue: "✂️ You throw Paper. The Lint Overlord throws Scissors! He wins!\n\nWith a magical poof, you are instantly turned into an un-aerodynamic pair of pleated khaki pants. A nearby dryer cycle begins. You are warm, but defeated.",
        choices: [
            { text: "Try Again", target: "intro", reset: true }
        ]
    },
    linterverse_shield: {
        title: "FRESH SCENT FORCEFIELD",
        speaker: "Narrator",
        dialogue: "🛡️ You whip out the Static Shield Sheet given by the dragon! The dryer sheets' protective energy creates an impenetrable forcefield of fresh scent.\n\nThe Lint Overlord tries to zap you, but the blast bounces back, popping his unicycle tire! He drops the sock in a panic.",
        action: () => { addInventory("The Left Sock"); },
        choices: [
            { text: "Secure the Left Sock", target: "win_screen" }
        ]
    },
    linterverse_blast: {
        title: "ALLERGIC SNEEZE",
        speaker: "Lint Overlord",
        dialogue: "💨 You throw your Handful of Magical Sock Lint directly at him. It causes an instantaneous, localized allergic explosion!\n\nThe Lint Overlord starts sneezing so violently he sneezes himself right out of his own crown! The left sock lands perfectly on your head.",
        action: () => { addInventory("The Left Sock"); },
        choices: [
            { text: "Take the sock and escape", target: "win_screen" }
        ]
    },

    forest_start: {
        title: "FOREST OF BAD DECISIONS",
        speaker: "Cursed Sock Golem",
        dialogue: "🌲 --- CHAPTER 2: FOREST OF BAD DECISIONS ---\nYou enter the woods. The trees are growing upside down and the leaves shout terrible advice like: 'Put your life savings into magic beans!'\n\nG is at the center of a clearing, trying to use the Reality Socks to summon an ultimate Pet Rock. A massive Cursed Sock Golem blocks the path, growling deeply.",
        choices: [
            { text: "Use reality permission slip", target: "forest_slip", stats: { cleverness: 2 } },
            { text: "Listen to the leaves", target: "forest_leaves", stats: { chaos: 2 } },
            { text: "Use radar to find weakness", target: "forest_radar" }
        ]
    },
    forest_slip: {
        title: "BUREAUCRATIC DEFEAT",
        speaker: "Narrator",
        dialogue: "📄 You pull out your 'Permission Slip from Reality' signed by the Arch-Wizard. You hold it up to the Golem.\n\nThe Golem inspects the handwriting, blinks its yarn eyes, nods respectfully, and completely dissolves into a harmless pile of clean laundry. G screams as you seize the socks!",
        action: () => { addInventory("Both Reality Socks"); },
        choices: [
            { text: "Collect the magical socks", target: "win_screen" }
        ]
    },
    forest_leaves: {
        title: "TIME WARP",
        speaker: "Narrator",
        dialogue: "🍂 You decide to follow the leaves' bad advice and loudly insult the Golem's grandmother.\n\nThe Golem gets deeply offended, picks you up, and throws you completely back into the middle of last week. You wake up on Monday with a headache.",
        choices: [
            { text: "Restart Game", target: "intro", reset: true }
        ]
    },
    forest_radar: {
        title: "TICKLE THREADS",
        speaker: "Narrator",
        dialogue: "📡 You activate your Lint Radar or Map! It identifies that the Golem is extremely ticklish on its heel.\n\nYou slip under its legs and tickle its lower threads. The Golem collapses into an uncontrollable fit of giggles, knocking over G's summoning circle. The socks fly right into your hands!",
        action: () => { addInventory("Both Reality Socks"); },
        choices: [
            { text: "Nab the socks", target: "win_screen" }
        ]
    },

    // === VICTORY CONTEXT ===
// === VICTORY CONTEXT ===
        win_screen: {
            title: "VICTORY ACHIEVED",
            speaker: "Arch-Wizard Pimblepants",
            dialogue: `🏆 --- VICTORY! ACCIDENT-FREE REALITY STITCHED --- 🏆
    🏆 VICTORY!

    You have restored the Reality Socks
    and saved the Wizard's Kingdom.

    Final Rank:
    🌟 Senior Sock Executive

    Achievements Earned:
    🧦 Sock Collector
    🐉 Dragon's Friend
    🌀 Reality Saver

    Adventure Statistics:
    Cleverness : ${gameState.cleverness}
    Chaos      : ${gameState.chaos}/5
    Sock Karma : ${gameState.sockKarma}

    Items Collected:
    ${gameState.inventory.map(item => `✓ ${item}`).join('\n')}

    Final Score:
    ★★★★★
    ${(gameState.cleverness * 10) + (gameState.sockKarma * 5) - (gameState.chaos * 10) + 400} Points

    Reward Unlocked:
    👑 Golden Sock Trophy

    Congratulations!
    Thanks for playing.

    📜 --- CERTIFICATE OF HEROISM --- 📜

    CERTIFICATE OF HEROISM AND WISDOM

    This certifies that

    The Intern

    successfully recovered
    the Reality Socks,
    saved the Wizard's Tower,
    and prevented the world
    from becoming one giant musical.

    Awarded by KGS
    THANKS FOR PLAYING!
    `,
            choices: [
                { text: "Play Again!", target: "intro", reset: true },
                { text: "View Credits", target: "credits_screen" }
            ]
        },

        credits_screen: {
            title: "GAME CREDITS",
            speaker: "Arch-Wizard Pimblepants",
            dialogue: "✨ ULTRA WONDERFUL & CHAOTIC EDITION ✨\n\nCreated with code, magic, and entirely too much laundry.\n\nLead Developer: KGS!\nSpecial Thanks: 🫵, The Judgmental Frog, and the Singing Soup.\n\nRemember: Always check your pockets before running the heavy sanitize cycle. 😏",
            choices: [
                { text: "Back to Victory Screen", target: "win_screen" },
                { text: "Play Again!", target: "intro", reset: true }
            ]
        }
};

// --- ENGINE UI STATE UPDATERS ---
function updateUI() {
    document.getElementById("stat-clever").innerText = gameState.cleverness;
    document.getElementById("stat-karma").innerText = gameState.sockKarma;
    document.getElementById("stat-inv").innerText = gameState.inventory.join(" | ");
    
    let blocks = "🔴".repeat(gameState.chaos) + "⚪".repeat(5 - gameState.chaos);
    document.getElementById("chaos-meter").innerText = blocks;

    if (gameState.chaos >= 5) {
        document.getElementById("game-container").classList.add("musical-flash");
        alert("🎵 EMERGENCY LEVEL CHAOS! Your character bursts into an unskippable musical number! 🎵");
        gameState.chaos = 1;
    } else if (gameState.chaos <= 1) {
        document.getElementById("game-container").classList.remove("musical-flash");
    }
}

function addInventory(item) {
    if (!gameState.inventory.includes(item)) {
        gameState.inventory.push(item);
    }
}

function handleDragonTip() {
    const index = gameState.inventory.indexOf("5 Gold Coins");
    if (index > -1) {
        gameState.inventory.splice(index, 1);
    }
    addInventory("Static Shield Sheet");
}

// --- RENDER VISUAL NOVEL DIALOGUE STREAM ---
function renderScene(nodeKey, interMessage = "") {
    const node = storyNodes[nodeKey];
    if (!node) return;
    if (node.action) node.action();

    updateUI();

    // Update Chapter Banner Title
    document.getElementById("chapter-title").innerText = node.title;

    const stream = document.getElementById("dialogue-stream");
    stream.innerHTML = ""; // Clear dialogue for clean visual presentation

// Display scene image if available
if (node.image) {
    const img = document.createElement("img");
    img.src = node.image;
    img.alt = node.title;
    img.className = "scene-image";
    stream.appendChild(img);
}

    // Optional transition notification block
    if (interMessage) {
        let noticeDiv = document.createElement("div");
        noticeDiv.className = "box narrator";
        noticeDiv.innerText = `📝 ${interMessage}`;
        stream.appendChild(noticeDiv);
    }

    // Split text content into paragraphs if any exist, or display directly
    let paragraphs = node.dialogue.split('\n\n');
    paragraphs.forEach((pText, idx) => {
        let boxDiv = document.createElement("div");
        if (idx === 0 || pText.includes("✨") || pText.includes("---")) {
            boxDiv.className = "box narrator";
            boxDiv.innerText = pText;
            stream.appendChild(boxDiv);
        } else {
            // Render as NPC dialogue speech group with mini avatar
            let groupDiv = document.createElement("div");
            groupDiv.className = "speech-group npc-group";

            let speakerDiv = document.createElement("div");
            speakerDiv.className = "speaker left";
            speakerDiv.innerText = node.speaker || "Character";

            let rowDiv = document.createElement("div");
            rowDiv.className = "bubble-row";

            let avatarDiv = document.createElement("div");
            avatarDiv.className = "avatar-mini";
            avatarDiv.innerHTML = `
                <svg viewBox="0 0 100 100" class="svg-avatar">
                <rect width="100" height="100" fill="#2d3b31"/>
                <circle cx="50" cy="45" r="20" fill="#a46d4a"/>
                <path d="M 25 35 Q 50 15 75 35 Q 80 55 75 60 Q 50 30 25 60 Z" fill="#1a120c"/>
                <path d="M 25 90 Q 50 70 75 90 Z" fill="#cc8e43"/>
                </svg>
            `;

            let bubbleDiv = document.createElement("div");
            bubbleDiv.className = "box npc";
            bubbleDiv.innerText = pText;

            rowDiv.appendChild(avatarDiv);
            rowDiv.appendChild(bubbleDiv);
            groupDiv.appendChild(speakerDiv);
            groupDiv.appendChild(rowDiv);
            stream.appendChild(groupDiv);
        }
    });

    // Append interactive choices container inside the dialogue flow
    let choicesWrapper = document.createElement("div");
    choicesWrapper.className = "choices-container";

    node.choices.forEach(choice => {
        // Inventory condition filters
        if (choice.text.includes("tip dragon") && !gameState.inventory.includes("5 Gold Coins")) return;
        if (choice.text.includes("Grilled Reality Sandwich") && !gameState.inventory.includes("Bread Sock")) return;
        if (choice.text.includes("use radar") && !gameState.inventory.includes("Lint Radar") && !gameState.inventory.includes("Crumpled Forest Map")) return;

        let btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.innerText = choice.text;
        btn.onclick = () => {
            if (choice.reset) {
                gameState.cleverness = 10;
                gameState.chaos = 0;
                gameState.sockKarma = 5;
                gameState.inventory = ["Magical Sock Lint", "5 Gold Coins", "Permission Slip from Reality"];
            }
            if (choice.stats) {
                if (choice.stats.chaos) gameState.chaos = Math.min(5, Math.max(0, gameState.chaos + choice.stats.chaos));
                if (choice.stats.cleverness) gameState.cleverness += choice.stats.cleverness;
                if (choice.stats.sockKarma) gameState.sockKarma += choice.stats.sockKarma;
            }
            renderScene(choice.target, choice.message || "");
        };
        choicesWrapper.appendChild(btn);
    });

    stream.appendChild(choicesWrapper);
    stream.scrollTop = stream.scrollHeight;
}

// Start Execution Pipeline
renderScene("intro");