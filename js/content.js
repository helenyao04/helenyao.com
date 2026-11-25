/* =====================================================================
   HELEN'S ORBIT — CONTENT FILE
   ---------------------------------------------------------------------
   This is the only file you need to edit to update the site's words,
   images and flip books. Everything is plain text between quotes.

   QUICK GUIDE
   • Images live in  site/assets/...  — put new files there and type
     their path here, e.g.  "assets/fabrx/newsletter-01.jpg"
   • Any image block looks like:
       { src: "assets/fabrx/ad-01.jpg", alt: "What it shows", caption: "Optional caption" }
     Optional extras:
       tone: "paper"  → shows it on an off-white card (good for ink drawings
                        or anything with a transparent background)
       tone: "dark"   → shows it on a dark card (good for light/glowy art)
       wide: true     → makes it span two columns in the gallery
   • A FLIP BOOK block looks like:
       { type: "flipbook", title: "Newsletter — Issue 1",
         ratio: 0.75,                 // page width ÷ page height (8.5x11 portrait = 0.77,
                                      //  11x8.5 landscape = 1.29, square = 1)
         pages: { folder: "assets/fabrx/issue-1", count: 12, ext: "jpg" } }
     → that expects files named 01.jpg, 02.jpg … 12.jpg inside the folder.
     Or list pages one by one:
         pages: ["assets/fabrx/cover.jpg", "assets/fabrx/p2.jpg", ...]
     Page 1 is the front cover (shown alone), then pages pair up as
     spreads (2–3, 4–5 …). An even page count ends on a back cover.
   • Save the file and refresh the browser. That's it.
   ===================================================================== */

window.SITE = {
  name: "Helen Yao",
  title: "Helen's Orbit",
  roles: ["Graphic Design", "Game Design", "Concept Art"],
  tagline: "Graphic designer, game designer & concept artist — BFA Game Design, NYU Tisch.",
  location: "Brooklyn, New York",
  email: "helenyao.04@gmail.com",
  linkedin: "http://www.linkedin.com/in/helen-yao-b94aab1b1",
  itch: "https://hy2256.itch.io",
  resumePdf: "assets/Helen-Yao-Resume.pdf",

  /* ------------------------------------------------------------- ME */
  about: {
    hello: "Hello, I'm Helen and I do…",
    statement: [
      "Growing up in New York City, I didn't know light pollution was the reason I couldn't see the stars in the sky. It wasn't until I moved out of the city, beyond its glowing billboards and blaring lights—past the reach of street lamps and neon signs—that I finally looked up and saw the night sky in full.",
      "My goal as a designer is to strip away noise so the important parts shine through; to illustrate what words alone can't describe, and to quiet the visual clutter that overwhelms both our world and our attention. I hope to open the sky for you through the limitless space of my imagination."
    ]
  },

  resume: {
    headline: "Marketing & Visual Content",
    experience: [
      {
        role: "Marketing / Reception",
        org: "FABrx Studio",
        dates: "Jul 2026 – Present",
        points: [
          "Produce newsletters, email and text campaigns, and promotional graphics and videos for patient outreach.",
          "Call inbound patient leads through Aesthetix and refine follow-up workflows to improve patient engagement.",
          "Created Skio workflows connected to Shopify to optimize customer retention and redirect customers to make subscriptions over one-time purchases.",
          "Maintain client databases and patient records in Boulevard, keeping contact lists accurate for campaigns.",
          "Coordinate daily front-desk logistics, appointment scheduling, and inventory."
        ],
        link: "#/graphics/fabrx-studio"
      },
      {
        role: "Publicity and Marketing Chair",
        org: "NYU alpha Kappa Delta Phi",
        dates: "Jul 2025 – Dec 2025",
        points: [
          "Designed and printed recruitment flyers, personalized member graphics, and fundraising and event graphics; grew chapter Instagram by 400+ followers in three months.",
          "Created promotional reveal and chapter videos for recruitment.",
          "Maintained consistent communication with the executive board and clients to meet deadlines."
        ],
        link: "#/graphics/social-media"
      },
      {
        role: "President",
        org: "NYU EDM Club",
        dates: "Apr 2026 – Nov 2026",
        points: [
          "Negotiated a venue partnership with The Bowery and a promotional collaboration with DJ Sara Landry, securing exclusive student discounts and a Q&A feature in her Day in the Life video with Spotify.",
          "Directed a 14-member executive board across event programming, marketing, and partnerships, running weekly meetings and tracking deliverables.",
          "Held ticket giveaways for social media growth purposes sponsored by partnership with The Bowery.",
          "Created promotional graphics and reels for Instagram growth."
        ]
      },
      {
        role: "Freelance Artist",
        org: "",
        dates: "Mar 2018 – Aug 2020",
        points: [
          "Built a 5,000+ follower social media audience that drove a client-based art commission business.",
          "Managed client communication, order tracking, and shipping logistics for 20+ international clients."
        ],
        link: "#/art"
      },
      {
        role: "Vice President of Finance",
        org: "NYU alpha Kappa Delta Phi",
        dates: "May 2026 – Present",
        points: [
          "Oversee treasury and budgets for a 16-member chapter and lead fundraising initiatives raising $1,000+ per semester."
        ]
      },
      {
        role: "Shift Manager",
        org: "XiangLa Hotpot",
        dates: "Oct 2025 – Jul 2026",
        points: [
          "Managed weekly schedules and supervised a team of 10 servers; tracked customer trends and feedback to optimize promotional events and deals."
        ]
      }
    ],
    projects: [],   // add { role, org, dates, points: [...], link } entries here to show a Projects card
    education: [
      { school: "NYU Tisch School of the Arts", degree: "BFA in Game Design, Minor in Digital Art", dates: "Sep 2024 – May 2027 (expected)", note: "GPA 3.7" },
      { school: "University of California, Riverside", degree: "Intended B.A. in Psychology", dates: "Sep 2022 – May 2024", note: "Transferred to NYU · Activities: GameSpawn Game Development Club, Intramural Volleyball" }
    ],
    skills: [
      { label: "Marketing", items: ["Email & text campaigns", "Newsletters", "Social media content & growth", "Promotional graphics & video", "Event promotion", "Partnerships", "Lead follow-up"] },
      { label: "Creative", items: ["Graphic design", "Illustration", "Concept art", "3D modeling", "UI/UX design", "Game design & development"] },
      { label: "Software", items: ["Blender", "Figma", "Unity", "GameMaker", "Illustrator", "Photoshop", "InDesign", "Procreate", "Clip Studio Paint", "Paint Tool SAI", "CapCut", "Canva", "Google Workspace", "Microsoft Office", "Slack", "Boulevard", "Aesthetix", "Skio"] },
      { label: "Languages", items: ["English", "Mandarin"] }
    ]
  },

  /* ---------------------------------------------------------- GAMES */
  games: [
    {
      slug: "the-house",
      title: "The House",
      cover: "assets/img/cover-the-house.webp",
      logo: "assets/img/house-logo.webp",
      logoTone: "paper",
      kicker: "Printed narrative puzzle book · Vol. 2, Maze of Doors",
      summary: "A 100-page horror narrative puzzle book.",
      meta: [
        { label: "My role", value: "Illustration & graphic design — visual aesthetic, pages, settings, maps, items, monsters & characters" },
        { label: "Team", value: "Ping Sanguanshua, Markus Luik, Skyler Kweon & Helen Yao" },
        { label: "Recognition", value: "Presented at NYU Game Center Spring Showcase 2025" }
      ],
      links: [],
      sections: [
        { type: "gallery", title: "Playtesting", columns: 4, items: [
          { src: "assets/img/house-play-1.webp", alt: "Players solving puzzles in The House" },
          { src: "assets/img/house-play-2.webp", alt: "Player writing answers in the book" },
          { src: "assets/img/house-play-3.webp", alt: "Close-up of the alphabet cipher page" },
          { src: "assets/img/house-play-4.webp", alt: "Group playtesting at the showcase" }
        ]},
        { type: "gallery", title: "Settings", items: [
          { src: "assets/img/house-cabin.webp", alt: "Cabin beside a dark pond", wide: true },
          { src: "assets/img/house-window.webp", alt: "Window grid looking onto clouds" },
          { src: "assets/img/house-curtain.webp", alt: "Curtained arched window in the rain" },
          { src: "assets/img/house-elevator.webp", alt: "Elevator standing in an overgrown field" },
          { src: "assets/img/house-train.webp", alt: "Train crossing tall grass", wide: true }
        ]},
        { type: "gallery", title: "Items & Monsters", columns: 5, items: [
          { src: "assets/img/house-door-1.webp", alt: "Arched wooden door", tone: "paper" },
          { src: "assets/img/house-door-2.webp", alt: "Arched door with blue key", tone: "paper" },
          { src: "assets/img/house-alien.webp", alt: "Grey alien creature", tone: "paper" },
          { src: "assets/img/house-creature-2.webp", alt: "Weeping teal creature", tone: "paper" },
          { src: "assets/img/house-creature-1.webp", alt: "Bowl-headed creature, ink", tone: "paper" },
          { src: "assets/img/house-creature-3.webp", alt: "Crouching bowl creature", tone: "paper" },
          { src: "assets/img/house-beetle.webp", alt: "Giant beetle", tone: "paper" },
          { src: "assets/img/house-doll-1.webp", alt: "Pale doll character", tone: "paper" },
          { src: "assets/img/house-doll-2.webp", alt: "Dark-haired doll character", tone: "paper" },
          { src: "assets/img/house-wisp.webp", alt: "Spirit wisp", tone: "paper" },
          { src: "assets/img/house-fire.webp", alt: "Flame", tone: "paper" },
          { src: "assets/img/house-bed.webp", alt: "Wooden bed", tone: "paper" },
          { src: "assets/img/house-wardrobe.webp", alt: "Clothing rack", tone: "paper" },
          { src: "assets/img/house-tv.webp", alt: "Old television on a cabinet", tone: "paper" },
          { src: "assets/img/house-fireplace.webp", alt: "Fireplace", tone: "paper" },
          { src: "assets/img/house-sofa.webp", alt: "Sofa", tone: "paper" },
          { src: "assets/img/house-chest.webp", alt: "Wooden chest", tone: "paper" },
          { src: "assets/img/house-table-1.webp", alt: "Table with a book", tone: "paper" },
          { src: "assets/img/house-ladder.webp", alt: "Ladder", tone: "paper" },
          { src: "assets/img/house-tp.webp", alt: "Toilet paper roll", tone: "paper" },
          { src: "assets/img/house-mask.webp", alt: "Face mask", tone: "paper" },
          { src: "assets/img/house-bricks.webp", alt: "Stone wall texture", tone: "paper" }
        ]}
      ]
    },
    {
      slug: "judgement",
      title: "Judgement",
      cover: "assets/img/cover-judgement.webp",
      logo: "assets/img/judgement-logo.webp",
      kicker: "3D mobile claw-machine game",
      summary: "A 3D mobile claw machine game that begs the question: what defines good or evil? Our vision focuses on making the core experience challenge players to consider intent, consequence, and moral ambiguity.",
      meta: [
        { label: "Team", value: "Jesse Natter, Nicole Vega & Helen Yao" },
        { label: "Password", value: "ghost" }
      ],
      links: [{ label: "Play on itch.io", url: "https://jessenatter.itch.io/ghost-game" }],
      sections: [
        { type: "gallery", title: "Gallery", items: [
          { src: "assets/img/judgement-machine.webp", alt: "The Judgement claw machine", wide: true },
          { src: "assets/img/judgement-lava.webp", alt: "Cracked lava stone texture" },
          { src: "assets/img/judgement-ghosts.webp", alt: "Ghost soul sprites", tone: "dark", wide: true },
          { src: "assets/img/judgement-ghost.webp", alt: "Single ghost soul sprite", tone: "dark" }
        ]}
      ]
    },
    {
      slug: "flashlight",
      title: "Flashlight",
      cover: "assets/img/cover-flashlight.webp",
      logo: "assets/img/flashlight-logo.webp",
      kicker: "2D horror exploration",
      summary: "An immersive 2D horror exploration experience that engages players in a tense, time-bound struggle for survival.",
      meta: [
        { label: "Team", value: "Dorisline Charles, Joon Lee, Nicole Vega & Helen Yao" }
      ],
      links: [{ label: "Play on itch.io", url: "https://dorisline.itch.io/flashlightweb" }],
      sections: [
        { type: "gallery", title: "Gallery", items: [
          { src: "assets/img/flashlight-cave.webp", alt: "Dark cave environment", wide: true },
          { src: "assets/img/flashlight-maze.webp", alt: "Top-down maze map" },
          { src: "assets/img/flashlight-bats.webp", alt: "Bat creature sprites", tone: "paper" },
          { src: "assets/img/flashlight-elders.webp", alt: "Bearded elder sprites", tone: "dark" },
          { src: "assets/img/flashlight-player.webp", alt: "Player character holding a flashlight", tone: "paper", wide: true }
        ]}
      ]
    }
  ],

  /* ------------------------------------------------------- GRAPHICS */
  graphics: [
    {
      slug: "alphabet-garden",
      planet: "Alphabet Book",
      title: "Alphabet Garden",
      cover: "assets/alphabet-garden/34.webp",
      kicker: "Hand-illustrated book · 56 pages",
      summary: "A hand-illustrated collection of flowers arranged alphabetically. I aimed to highlight the meanings given to certain flowers through play on typography to capsulate the feeling.",
      meta: [{ label: "Medium", value: "Digital illustration, typography, book design" }],
      sections: [
        { type: "flipbook", title: "Flip through the book", ratio: 1.294,
          pages: { folder: "assets/alphabet-garden", count: 56, ext: "webp" } }
      ]
    },
    {
      slug: "emotions",
      planet: "Emotions",
      title: "Double the Emotions",
      cover: "assets/img/emo-03.webp",
      kicker: "Typography study",
      summary: "The purpose of this practice was to explore the ways emotions could be communicated visually, with the constraint of using either only typography or everything else. But… what if we used no color as well?",
      meta: [{ label: "Constraint", value: "Type-only vs. image-only, in black & white" }],
      sections: [
        { type: "gallery", title: "Studies", columns: 4, items: [
          { src: "assets/img/emo-01.webp", alt: "Lonely — type study" },
          { src: "assets/img/emo-02.webp", alt: "Lonely — image study" },
          { src: "assets/img/emo-03.webp", alt: "Stressed — type study" },
          { src: "assets/img/emo-04.webp", alt: "Stressed — image study" },
          { src: "assets/img/emo-05.webp", alt: "Untitled emotion — type study" },
          { src: "assets/img/emo-06.webp", alt: "Untitled emotion — image study" },
          { src: "assets/img/emo-07.webp", alt: "Tired — type study" },
          { src: "assets/img/emo-08.webp", alt: "Tired — image study" },
          { src: "assets/img/emo-09.webp", alt: "Angry" },
          { src: "assets/img/emo-10.webp", alt: "Surprised" },
          { src: "assets/img/emo-11.webp", alt: "Happiness" }
        ]}
      ]
    },
    {
      slug: "social-media",
      planet: "Social Media",
      title: "aKDPhi · Urban Summer",
      cover: "assets/img/akdphi-post-01.webp",
      kicker: "Social media & recruitment campaign",
      summary: "As the Publicity and Marketing Chair for alpha Kappa Delta Phi, I led the visual direction and branding of our Instagram presence. Our recruitment theme, “Urban Summer,” inspired me to take on a journal-style visual diary approach — to document the last fleeting moments of summertime in New York City before school started again, for future us to look back upon with nostalgia and longing.",
      meta: [
        { label: "Role", value: "Publicity & Marketing Chair" },
        { label: "Impact", value: "+300 Instagram followers in three months" },
        { label: "Tools", value: "Illustrator, Photoshop, CapCut" }
      ],
      sections: [
        { type: "gallery", title: "Flyers", columns: 3, items: [
          { src: "assets/img/akdphi-flyer-1.webp", alt: "aKDPhi Hour flyer" },
          { src: "assets/img/akdphi-flyer-2.webp", alt: "Recruitment schedule flyer" },
          { src: "assets/img/akdphi-flyer-3.webp", alt: "Flyer photographed with a cat" }
        ]},
        { type: "gallery", title: "Posts", columns: 4, items: [
          { src: "assets/img/akdphi-post-01.webp", alt: "Member spotlight post" },
          { src: "assets/img/akdphi-post-02.webp", alt: "Member spotlight post" },
          { src: "assets/img/akdphi-post-03.webp", alt: "Member spotlight post" },
          { src: "assets/img/akdphi-post-04.webp", alt: "Member spotlight post" },
          { src: "assets/img/akdphi-post-05.webp", alt: "Member spotlight post" },
          { src: "assets/img/akdphi-post-06.webp", alt: "Member spotlight post" },
          { src: "assets/img/akdphi-post-07.webp", alt: "Member spotlight post" },
          { src: "assets/img/akdphi-post-08.webp", alt: "Member spotlight post" },
          { src: "assets/img/akdphi-post-09.webp", alt: "Recruitment video cover" },
          { src: "assets/img/akdphi-post-10.webp", alt: "Active house video cover" },
          { src: "assets/img/akdphi-post-11.webp", alt: "Pre-recruitment coffee chats" },
          { src: "assets/img/akdphi-post-12.webp", alt: "Recruitment chairs contact post" },
          { src: "assets/img/akdphi-post-13.webp", alt: "Fall '25 board cover" },
          { src: "assets/img/akdphi-post-14.webp", alt: "Executive board post" },
          { src: "assets/img/akdphi-post-15.webp", alt: "Cabinet post" },
          { src: "assets/img/akdphi-ball.webp", alt: "Breast Cancer Awareness Ball poster" }
        ]}
      ]
    },
    {
      slug: "lune-noire",
      planet: "Branding & Product",
      title: "Lune Noire",
      cover: "assets/img/lune-poster.webp",
      kicker: "Conceptual jewelry brand · 3D product",
      summary: "Lune Noire is a conceptual jewelry brand born from my fascination with the moon and its quiet, magnetic presence. The silent company it provides as it follows you on late-night walks or drives is similar to how our jewelry sits: unobtrusive, yet undeniably alluring. I drew inspiration from the cold elegance of moonlight and its enduring mystery — this project reflects my long-standing desire to create a fashion or jewelry brand with one of the most personally symbolic metaphors in my life as my muse: the Moon.",
      meta: [
        { label: "Deliverables", value: "Logo, typography, brand visuals, 3D product, renders" },
        { label: "Tools", value: "Blender, 3D printing, Photoshop" }
      ],
      sections: [
        { type: "gallery", title: "Brand", columns: 2, items: [
          { src: "assets/img/lune-poster.webp", alt: "Lune Noire 'Made for the Moon' poster" },
          { src: "assets/img/lune-dragoon-poster.webp", alt: "Dragoon launch poster" }
        ]},
        { type: "text", title: "Dragoon", body: "For this first launch, I aimed to create an extension of one's ear into a dragon-like being that resides deep within the depths of the moon's craters. The piece symbolizes inner chaos masked under the cold surface of resilience. I went through a process of sketching, making maquettes, and modeling in Blender to 3D print Lune Noire's first product: Dragoon." },
        { type: "gallery", title: "Process", columns: 3, items: [
          { src: "assets/img/lune-sketch.webp", alt: "Dragoon concept sketches", wide: true },
          { src: "assets/img/lune-render-1.webp", alt: "Clay render, side" },
          { src: "assets/img/lune-render-2.webp", alt: "Clay render, front" },
          { src: "assets/img/lune-render-3.webp", alt: "Clay render, detail" },
          { src: "assets/img/lune-red-2.webp", alt: "Product render in red light" },
          { src: "assets/img/lune-silver.webp", alt: "Printed silver prototype" },
          { src: "assets/img/lune-worn.webp", alt: "Dragoon ear cuff worn" }
        ]}
      ]
    },
    {
      /* ======================= FABRX STUDIO =======================
         Your in-progress project. Fill in the summary/meta, then add
         sections below. Copy the commented examples and remove the //.
         While "sections" is empty the page shows a "coming soon" note. */
      slug: "fabrx-studio",
      planet: "Advertising & Newsletters",
      title: "FABRX Studio",
      logo: "assets/img/fabrx-logo.webp",
      cover: "assets/fabrx/brand-book/06.webp",   // shown on the Graphics page
      kicker: "Brand, email & social design",
      summary: "FABrx Studio is a dermatologist-led skincare studio in Union Square. The main clinic Marie V Hayag, MD, PC is located on the Upper East Side. I was tasked to create newsletters, social media templates and posts, as well as promotional materials for our memberships and partnerships with other businesses.",
      meta: [
        { label: "Deliverables", value: "Brand book, email newsletters, membership & partner flyers, social carousels" },
        { label: "Client", value: "FABrx Studio · Marie V Hayag, MD, PC" }
        // { label: "Tools", value: "Canva, Illustrator" }   ← add yours
      ],
      sections: [
        /* Brand book — 7 slides, page 1 is the cover */
        { type: "flipbook", title: "Brand Book", ratio: 1.778,
          pages: { folder: "assets/fabrx/brand-book", count: 7, ext: "webp" } },

        /* Long-format email newsletters — each scrolls inside its frame */
        { type: "newsletters", title: "Email Newsletters", items: [
          { src: "assets/fabrx/newsletter-fall.webp", subject: "Fall into a new skin routine", alt: "FABrx fall newsletter" },
          { src: "assets/fabrx/newsletter-reviews.webp", subject: "5 Stars, 0 Filters", alt: "FABrx client reviews newsletter" },
          { src: "assets/fabrx/newsletter-botox.webp", subject: "The beauty of Preventative Botox", alt: "FABrx preventative Botox newsletter" },
          { src: "assets/fabrx/newsletter-fall-mvh.webp", subject: "Fall routine · Marie V. Hayag MD", alt: "Marie V. Hayag MD fall newsletter", caption: "Sister-brand version" }
        ]},

        /* Membership & partner flyers */
        { type: "gallery", title: "Membership & Partner Flyers", columns: 4, items: [
          { src: "assets/fabrx/flyer-ultimate.webp", alt: "Get FAB Ultimate Membership flyer", caption: "FAB Ultimate · $300/mo" },
          { src: "assets/fabrx/flyer-glow-bank.webp", alt: "Glow Bank Membership flyer", caption: "Glow Bank · $375/mo" },
          { src: "assets/fabrx/flyer-glow-advanced.webp", alt: "Glow Advanced Membership flyer", caption: "Glow Advanced · $450/mo" },
          { src: "assets/fabrx/flyer-parent-reset.webp", alt: "FABrx × HGL Art Preschool Parent Reset Exclusive flyer", caption: "Parent Reset × HGL Art Preschool" }
        ]},

        /* Instagram carousels — swipe through each one */
        { type: "carousels", title: "Social Media", items: [
          { title: "Why XERF is the best", caption: "Treatment explainer carousel",
            slides: ["assets/fabrx/social-xerf-1.webp", "assets/fabrx/social-xerf-2.webp", "assets/fabrx/social-xerf-3.webp", "assets/fabrx/social-xerf-4.webp"] },
          { title: "Q & A with Dr. Hayag", caption: "Reusable Q&A carousel template",
            slides: ["assets/fabrx/social-qa-1.webp", "assets/fabrx/social-qa-2.webp", "assets/fabrx/social-qa-3.webp", "assets/fabrx/social-qa-4.webp"] }
        ]}
      ]
    }
  ],

  /* ------------------------------------------------------------ ART */
  art: {
    title: "Character Art",
    summary: "Character designs grounded in narrative lore — turnarounds, costumes and transformations.",
    sections: [
      { type: "gallery", items: [
        { src: "assets/img/art-vaelion.webp", alt: "Vaelion turnaround and ascended form", caption: "Vaelion, a demi-god of Vengeance", tone: "dark", wide: true },
        { src: "assets/img/art-kresha.webp", alt: "Kresha, two poses with cosmic clouds", caption: "Kresha the Cosmic Goddess; Weaver of Constellations", tone: "dark", wide: true },
        { src: "assets/img/art-forest.webp", alt: "Character in a fox-skull headdress seated with twin blades", caption: "Character study", wide: true }
      ]}
    ]
  }
};
