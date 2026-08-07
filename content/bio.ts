export type BioLink = {
  label: string
  href: string
}

export type BioRole = {
  company: string
  location?: string
  roles: Array<{
    title: string
    dates: string
    highlights: string[]
  }>
}

export const bioData = {
  name: 'Or Fleisher',
  title: 'Engineer | Creative Technologist',
  location: 'New York, NY',
  email: 'contact@orfleisher.com',
  website: 'orfleisher.com',
  links: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/orfleisher/' },
    { label: 'GitHub', href: 'https://github.com/juniorxsound' },
    { label: '+1 (347) 339-9440', href: 'tel:+13473399440' },
  ] satisfies BioLink[],
  summary:
    'Principal engineer who solves complex visual problems with code, specializing in computer graphics, computer vision, and data visualization.',
  work: [
    {
      company: 'Nike',
      location: 'New York, NY',
      roles: [
        {
          title: 'Principal Front-End Engineer',
          dates: '2023–2026',
          highlights: [
            'Led the engineering team behind Nike’s .SWOOSH 3D commerce experiences.',
            'Built a cloud renderer that generated more than 50,000 product thumbnails and videos from 3D models.',
            'Mentored engineers working across open source, design systems, and developer tooling.',
          ],
        },
      ],
    },
    {
      company: 'New York University · ITP',
      location: 'New York, NY',
      roles: [
        {
          title: 'Adjunct Professor, Visual Journalism',
          dates: 'Fall 2023',
          highlights: [
            'Co-taught technical 3D web programming, guiding graduate students from visual-journalism concepts to interactive browser-based work.',
          ],
        },
      ],
    },
    {
      company: 'The New York Times · Research & Development',
      location: 'New York, NY',
      roles: [
        {
          title: 'Staff Engineer',
          dates: '2021–2023',
          highlights: [
            'Built a real-time 3D editor that enabled visual editors to publish live 3D sports coverage for the first time, including the Winter Olympics, Super Bowl, and World Cup.',
            'Created CI/CD templates and technical documentation that standardized delivery workflows across the R&D engineering team.',
            'Open-sourced The Times’s 3D toolchain for asset optimization, headless Blender rendering, and camera control. The projects earned hundreds of GitHub stars and hundreds of thousands of downloads.',
            'Presented on behalf of the R&D team at Adobe Research, Columbia University, and Georgia Tech; mentored engineers across the team.',
          ],
        },
        {
          title: 'Senior Engineer',
          dates: '2019–2021',
          highlights: [
            'Built 3D rendering, reconstruction, and data pipelines for COVID-19 and Olympics stories that were among The Times’s most-read work when published.',
            'Built athlete-tracking pipelines used in more than 10 published Olympics graphics.',
            'Invented a patented system for generating three-dimensional map tiles and set organization-wide open-source standards.',
          ],
        },
      ],
    },
    {
      company: 'Vimeo',
      location: 'New York, NY',
      roles: [
        {
          title: 'Senior Engineer, Emerging Technology',
          dates: '2019',
          highlights: [
            'Led development of VR playback for Vimeo’s web player.',
            'Developed patented computer-vision and machine-learning methods for video-format classification and metadata injection.',
          ],
        },
        {
          title: 'Principal Creative Technologist',
          dates: '2018–2019',
          highlights: [
            'Built and maintained open-source video integrations for Unity, three.js, A-Frame, depth capture, and volumetric playback.',
            'Created Vimeo’s Looking Glass holographic-video experience, featured by TechCrunch, Forbes, Wired, and Engadget.',
          ],
        },
      ],
    },
    {
      company: 'Phenomena Labs',
      location: 'Tel Aviv, Israel',
      roles: [
        {
          title: 'Co-Founder · Creative & Technical Director',
          dates: '2010–2016',
          highlights: [
            'Co-founded an award-winning visual-effects and interaction-design studio, developing and directing five VR titles released across Oculus, Gear VR, and WebVR.',
            'Presented work at Cannes, GDC, SIGGRAPH, and SXSW; earned honors from FWA, Awwwards, WorldFest, and Urban MediaMakers.',
          ],
        },
      ],
    },
  ] satisfies BioRole[],
  education: [
    {
      school: 'New York University · Tisch School of the Arts',
      degree: 'M.P.S., Interactive Telecommunications Program (ITP)',
      dates: '2016–2018',
      detail:
        'Focus: computer graphics, volumetric capture, machine learning, and immersive experience development. Research with Ken Perlin’s Future Reality Lab.',
    },
    {
      school: 'Tel Aviv University',
      degree: 'B.A., Film and Television',
      dates: '2011–2014',
      detail:
        'Research: sound design and interaction in branching narrative experiences.',
    },
  ],
  publications: [
    {
      type: 'Patent',
      title: 'Tile Three-Dimensional Mapping Tool',
      detail: 'U.S. Patent 12,223,596 · Inventor',
      href: 'https://patents.google.com/patent/US12223596B2/en?inventor=Or+Fleisher',
    },
    {
      type: 'Patent',
      title: 'Video Format Classification and Metadata Injection Using Machine Learning',
      detail: 'U.S. Patent Application 2020/0372255 · Inventor',
      href: 'https://patents.google.com/patent/US20200372255A1/en?inventor=Or+Fleisher&assignee=Vimeo',
    },
    {
      type: 'AIAA SciTech 2022',
      title: 'Simulation of Flow and Pathogen Transport in a Narrow-Body Airplane Cabin',
      detail: 'Co-author',
      href: 'https://arc.aiaa.org/doi/10.2514/6.2022-0334',
    },
    {
      type: 'ACM SIGGRAPH 2018',
      title: 'Volume: 3D Reconstruction of History for Immersive Platforms',
      detail: 'Co-author',
      href: 'https://dl.acm.org/doi/10.1145/3230744.3230791',
    },
  ],
  openSource: [
    {
      name: 'headless-three-webgpu',
      detail:
        'A headless WebGPU renderer for servers and agent harnesses.',
      href: 'https://github.com/juniorxsound/headless-three-webgpu',
    },
    {
      name: 'The New York Times Containerized 3D Rendering',
      detail:
        'Docker containers for running Blender headlessly in local and distributed rendering workflows.',
      href: 'https://github.com/nytimes/rd-blender-docker',
    },
    {
      name: 'Vimeo Unity SDK',
      detail:
        'Led development of Vimeo’s open-source Unity SDK for streaming, recording, and publishing video in Unity applications.',
      href: 'https://github.com/vimeo/vimeo-unity-sdk',
    },
    {
      name: 'The New York Times 3D Bundler Plugins',
      detail:
        'Build plugins for optimizing glTF assets before publication.',
      href: 'https://github.com/nytimes/rd-bundler-3d-plugins',
    },
  ],
  awards: [
    {
      name: 'Gerald Loeb Award',
      detail: 'COVID-19 aviation and Empire State Building visual reporting',
    },
    {
      name: 'Malofiej Awards',
      detail: 'Gold, two Silver, and Bronze medals for visual journalism',
    },
    {
      name: 'Society for News Design',
      detail: 'Gold, two Silver medals, and multiple Awards of Excellence',
    },
    {
      name: 'Society for Advancing Business Editing and Writing',
      detail: 'Best in Business, Innovation winner (2020 and 2021)',
    },
    {
      name: 'WorldFest · NASA Remi Award',
      detail: 'Livyatanim: MYTH',
    },
  ],
  skills: [
    {
      category: 'Computer graphics',
      items: 'WebGL, WebGPU, GLSL, HLSL, OpenGL, Three.js, React Three Fiber, Blender, Unity',
    },
    {
      category: 'Computer vision & ML',
      items: 'PyTorch, OpenCV, TensorFlow, Core ML, 3D reconstruction, depth sensing, volumetric capture',
    },
    {
      category: 'Web engineering',
      items: 'TypeScript, JavaScript, React, Node.js, Express, REST APIs, GraphQL, WebSockets, relational databases, server architecture, Docker, CI/CD',
    },
    {
      category: 'Additional languages',
      items: 'C++, C#, Python, Swift, English, Hebrew',
    },
  ],
} as const
