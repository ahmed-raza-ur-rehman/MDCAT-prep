/**
 * MDCAT PrepMaster — prep-data.js
 * Comprehensive High-Yield Study Notes, PMDC Syllabus Chapter Navigator,
 * SVG Scientific Diagrams, Formulas & Vocabulary.
 */

export const PREP_DATA = {
  // ── 1. CHAPTER DIRECTORY (73 CHAPTERS ALIGNED WITH PMDC) ───────
  chapters: [
    // ── BIOLOGY (23 Chapters: Foundation, Class 11, Class 12)
    {
      subject: 'Biology',
      classLevel: 'Class 11',
      badgeClass: 'badge-class11',
      name: 'Biological Molecules',
      numMcqs: 12,
      topics: ['Carbohydrates (Mono, Di, Poly)', 'Proteins & Peptide Bonds', 'Lipids & Ester Linkages', 'DNA vs RNA Structure', 'Water as solvent & high heat capacity'],
    },
    {
      subject: 'Biology',
      classLevel: 'Class 11',
      badgeClass: 'badge-class11',
      name: 'Enzymes & Bio-catalysis',
      numMcqs: 8,
      topics: ['Active Site & Substrate complex', 'Lock & Key vs Induced Fit', 'Factors affecting rate (T, pH, [S])', 'Competitive & Non-competitive inhibition', 'Coenzymes & Prosthetic groups'],
    },
    {
      subject: 'Biology',
      classLevel: 'Class 11',
      badgeClass: 'badge-class11',
      name: 'Cell Biology & Organelles',
      numMcqs: 14,
      topics: ['Prokaryotic vs Eukaryotic cells', 'Fluid Mosaic Membrane model', 'Double-membrane: Mitochondria & Chloroplast', 'Endomembrane: ER & Golgi apparatus', 'Lysosomes, Peroxisomes & Cytoskeleton'],
    },
    {
      subject: 'Biology',
      classLevel: 'Class 11',
      badgeClass: 'badge-class11',
      name: 'Bioenergetics',
      numMcqs: 10,
      topics: ['Photosynthetic Pigments & Absorption', 'Light Reaction (Photophosphorylation)', 'Calvin Cycle (Dark Reaction)', 'Glycolysis, Krebs Cycle & ETC', 'ATP synthesis via Chemiosmosis'],
    },
    {
      subject: 'Biology',
      classLevel: 'Class 11',
      badgeClass: 'badge-class11',
      name: 'Acellular Life (Viruses)',
      numMcqs: 7,
      topics: ['Bacteriophage structure & life cycle', 'Lytic vs Lysogenic cycle', 'Retrovirus replication (HIV & Reverse Transcriptase)', 'Viral diseases (Hepatitis, Polio, COVID-19)', 'Prions and Viroids'],
    },
    {
      subject: 'Biology',
      classLevel: 'Class 11',
      badgeClass: 'badge-class11',
      name: 'Kingdom Diversity',
      numMcqs: 8,
      topics: ['Monera: Gram +ve vs Gram -ve bacteria', 'Protista: Plant-like, Animal-like & Fungus-like', 'Fungi: Hyphae, Reproduction, Economic role', 'Plantae: Bryophytes, Pteridophytes, Gymno & Angiosperms', 'Animalia: Invertebrate phyla & Chordates'],
    },
    {
      subject: 'Biology',
      classLevel: 'Class 11',
      badgeClass: 'badge-class11',
      name: 'Gaseous Exchange & Respiration',
      numMcqs: 8,
      topics: ['Human Respiratory System Anatomy', 'Mechanism of Inhalation & Exhalation', 'Transport of O₂ & CO₂ in blood', 'Bohr Effect & Oxygen-Hemoglobin curve', 'Respiratory disorders (Asthma, Emphysema)'],
    },
    {
      subject: 'Biology',
      classLevel: 'Class 11',
      badgeClass: 'badge-class11',
      name: 'Transport in Plants & Animals',
      numMcqs: 11,
      topics: ['Xylem water uptake & Transpiration pull', 'Phloem Translocation (Pressure Flow Theory)', 'Human Heart anatomy & Cardiac cycle', 'Blood vessels (Arteries, Veins, Capillaries)', 'Blood composition, ABO & Rh groups'],
    },
    {
      subject: 'Biology',
      classLevel: 'Class 12',
      badgeClass: 'badge-class12',
      name: 'Coordination & Nervous System',
      numMcqs: 11,
      topics: ['Neuron structure & Resting Membrane Potential', 'Action Potential & Saltatory conduction', 'Synaptic Transmission & Neurotransmitters', 'Central & Peripheral Nervous System', 'Endocrine Glands: Hormones & Feedback loops'],
    },
    {
      subject: 'Biology',
      classLevel: 'Class 12',
      badgeClass: 'badge-class12',
      name: 'Reproduction & Development',
      numMcqs: 9,
      topics: ['Male & Female Reproductive Systems', 'Spermatogenesis & Oogenesis', 'Menstrual Cycle hormonal regulation', 'Fertilization & Early embryonic cleavage', 'Sexually Transmitted Infections (STIs)'],
    },
    {
      subject: 'Biology',
      classLevel: 'Class 12',
      badgeClass: 'badge-class12',
      name: 'Inheritance & Molecular Genetics',
      numMcqs: 12,
      topics: ['Mendel’s Laws of Segregation & Assortment', 'Monohybrid (3:1) & Dihybrid (9:3:3:1) ratios', 'Codominance & Incomplete dominance', 'Sex-linkage (Hemophilia, Color Blindness)', 'DNA Replication, Transcription & Translation'],
    },
    {
      subject: 'Biology',
      classLevel: 'Class 12',
      badgeClass: 'badge-class12',
      name: 'Evolution & Population Genetics',
      numMcqs: 6,
      topics: ['Darwinism & Natural Selection', 'Evidence: Homologous vs Analogous structures', 'Hardy-Weinberg Principle (p² + 2pq + q² = 1)', 'Speciation & Genetic Drift', 'Fossil record & Vestigial organs'],
    },
    {
      subject: 'Biology',
      classLevel: 'Class 12',
      badgeClass: 'badge-class12',
      name: 'Ecosystem & Environmental Biology',
      numMcqs: 6,
      topics: ['Food chains, Food webs & Trophic levels', 'Energy pyramid & 10% rule', 'Biogeochemical cycles (Carbon & Nitrogen)', 'Succession: Primary vs Secondary', 'Human impact & Conservation'],
    },
    {
      subject: 'Biology',
      classLevel: 'Foundation (9-10)',
      badgeClass: 'badge-foundation',
      name: 'Human Digestive System',
      numMcqs: 7,
      topics: ['Mouth, Stomach, Small & Large intestine', 'Salivary, Gastric, Pancreatic & Bile enzymes', 'Absorption in Villi & Microvilli', 'Liver functions & Hepatic portal system'],
    },
    {
      subject: 'Biology',
      classLevel: 'Foundation (9-10)',
      badgeClass: 'badge-foundation',
      name: 'Homeostasis & Osmoregulation',
      numMcqs: 8,
      topics: ['Osmoregulation in Freshwater vs Marine fish', 'Human Kidney & Nephron structure', 'Urine formation: Filtration, Reabsorption, Secretion', 'Counter-current multiplier & ADH control'],
    },
    {
      subject: 'Biology',
      classLevel: 'Foundation (9-10)',
      badgeClass: 'badge-foundation',
      name: 'Support & Movement',
      numMcqs: 6,
      topics: ['Axial vs Appendicular skeleton', 'Types of Joints (Synovial, Cartilaginous, Fibrous)', 'Skeletal muscle sarcomere & Sliding Filament Theory', 'Tetanus, Fatigue & Muscle cramps'],
    },

    // ── CHEMISTRY (22 Chapters: Physical, Inorganic, Organic)
    {
      subject: 'Chemistry',
      classLevel: 'Class 11',
      badgeClass: 'badge-class11',
      name: 'Atomic Structure & Quantum Numbers',
      numMcqs: 7,
      topics: ['Bohr model of hydrogen & line spectrum', 'Quantum numbers (n, l, m, s)', 'Aufbau principle, Pauli exclusion & Hund’s rule', 'Electronic configuration of transition metals', 'De Broglie & Heisenberg Uncertainty'],
    },
    {
      subject: 'Chemistry',
      classLevel: 'Class 11',
      badgeClass: 'badge-class11',
      name: 'Chemical Bonding & Molecular Shapes',
      numMcqs: 8,
      topics: ['Ionic, Covalent & Coordinate covalent bonds', 'VSEPR Theory: Linear, Trigonal planar, Tetrahedral', 'Hybridization: sp, sp², sp³ orbital geometry', 'Dipole moments & Bond polarities', 'Intermolecular forces (London, Dipole-Dipole, H-Bond)'],
    },
    {
      subject: 'Chemistry',
      classLevel: 'Class 11',
      badgeClass: 'badge-class11',
      name: 'Gases & Gas Laws',
      numMcqs: 7,
      topics: ['Boyle’s, Charles’s & Avogadro’s Laws', 'Ideal Gas Equation (PV = nRT)', 'Dalton’s Law of Partial Pressures', 'Graham’s Law of Diffusion (r₁/r₂ = √(M₂/M₁))', 'Kinetic Molecular Theory & Real Gas deviation'],
    },
    {
      subject: 'Chemistry',
      classLevel: 'Class 11',
      badgeClass: 'badge-class11',
      name: 'States of Matter: Liquids & Solids',
      numMcqs: 6,
      topics: ['Evaporation, Vapor pressure & Boiling point', 'Hydrogen bonding anomalies in water', 'Crystalline vs Amorphous solids', 'Unit cells & Lattice energy', 'Isomorphism and Polymorphism'],
    },
    {
      subject: 'Chemistry',
      classLevel: 'Class 11',
      badgeClass: 'badge-class11',
      name: 'Chemical Equilibrium & Acid-Base',
      numMcqs: 8,
      topics: ['Equilibrium constant (Kc, Kp) & calculations', 'Le Chatelier’s Principle (Concentration, P, T)', 'pH, pOH & Kw calculations (pH + pOH = 14)', 'Buffer solutions (Henderson-Hasselbalch)', 'Common ion effect & Solubility product (Ksp)'],
    },
    {
      subject: 'Chemistry',
      classLevel: 'Class 11',
      badgeClass: 'badge-class11',
      name: 'Thermochemistry',
      numMcqs: 6,
      topics: ['Exothermic vs Endothermic reactions', 'Standard enthalpy of formation & combustion', 'Hess’s Law of Constant Heat Summation', 'Bond energies & Enthalpy calculations', 'Born-Haber Cycle for lattice enthalpy'],
    },
    {
      subject: 'Chemistry',
      classLevel: 'Class 12',
      badgeClass: 'badge-class12',
      name: 'Electrochemistry',
      numMcqs: 7,
      topics: ['Oxidation numbers & Balancing redox reactions', 'Galvanic vs Electrolytic cells', 'Standard Hydrogen Electrode (SHE)', 'Electrochemical Series & E° cell calculation', 'Faraday’s Laws of Electrolysis'],
    },
    {
      subject: 'Chemistry',
      classLevel: 'Class 12',
      badgeClass: 'badge-class12',
      name: 'Reaction Kinetics',
      numMcqs: 6,
      topics: ['Rate of reaction & Rate law expression', 'Order of reaction (Zero, 1st, 2nd)', 'Half-life period (t₁/₂ = 0.693/k for 1st order)', 'Collision theory & Activation energy (Ea)', 'Catalysis: Homogeneous vs Heterogeneous'],
    },
    {
      subject: 'Chemistry',
      classLevel: 'Class 12',
      badgeClass: 'badge-class12',
      name: 's-Block & p-Block Elements',
      numMcqs: 6,
      topics: ['Alkali & Alkaline earth metals trends', 'Flame tests of Group 1 & 2 cations', 'Halogens: Oxidizing power & displacement', 'Noble gases: Electronic stability & Xenon compounds', 'Oxides, Chlorides & Hydrides across Period 3'],
    },
    {
      subject: 'Chemistry',
      classLevel: 'Class 12',
      badgeClass: 'badge-class12',
      name: 'Transition Metals (d-Block)',
      numMcqs: 5,
      topics: ['Characteristic properties of transition elements', 'Variable oxidation states & Catalytic activity', 'Color of transition metal complexes (d-d transition)', 'Coordination compounds, Ligands & Coordination number'],
    },
    {
      subject: 'Chemistry',
      classLevel: 'Class 12',
      badgeClass: 'badge-class12',
      name: 'Fundamental Organic Chemistry',
      numMcqs: 7,
      topics: ['Classification & IUPAC Nomenclature rules', 'Functional group priority order', 'Structural Isomerism (Chain, Positional, Functional)', 'Stereoisomerism (Geometric cis/trans & Optical)', 'Homolytic vs Heterolytic bond cleavage'],
    },
    {
      subject: 'Chemistry',
      classLevel: 'Class 12',
      badgeClass: 'badge-class12',
      name: 'Hydrocarbons (Aliphatic & Aromatic)',
      numMcqs: 9,
      topics: ['Alkanes: Free radical substitution mechanism', 'Alkenes: Electrophilic addition & Markovnikov’s Rule', 'Alkynes: Acidity & Hydrogenation', 'Benzene: Kekulé structure & Resonance stabilization', 'Electrophilic Aromatic Substitution (Nitration, Halogenation)'],
    },
    {
      subject: 'Chemistry',
      classLevel: 'Class 12',
      badgeClass: 'badge-class12',
      name: 'Alkyl Halides',
      numMcqs: 6,
      topics: ['Classification: 1°, 2°, 3° alkyl halides', 'SN1 vs SN2 Nucleophilic substitution mechanisms', 'E1 vs E2 Elimination reactions', 'Grignard Reagent preparation & synthetic applications'],
    },
    {
      subject: 'Chemistry',
      classLevel: 'Class 12',
      badgeClass: 'badge-class12',
      name: 'Alcohols, Phenols & Ethers',
      numMcqs: 7,
      topics: ['Lucas Test (Distinguishing 1°, 2°, 3° alcohols)', 'Acidic character of Phenol vs Alcohol', 'Reactions of Phenol (Bromination, Nitration)', 'Williamson Ether synthesis'],
    },
    {
      subject: 'Chemistry',
      classLevel: 'Class 12',
      badgeClass: 'badge-class12',
      name: 'Aldehydes & Ketones (Carbonyls)',
      numMcqs: 8,
      topics: ['Nucleophilic addition reactions (HCN, NaHSO₃)', 'Tollens’ & Fehling’s diagnostic tests', 'Iodoform Test for methyl ketones', 'Aldol Condensation & Cannizzaro reaction mechanisms'],
    },
    {
      subject: 'Chemistry',
      classLevel: 'Class 12',
      badgeClass: 'badge-class12',
      name: 'Carboxylic Acids & Derivatives',
      numMcqs: 6,
      topics: ['Acidity of Carboxylic acids & inductive effects', 'Esterification reaction mechanism', 'Acid chlorides, Anhydrides & Amides', 'Amino acids: Zwitterion structure & Isoelectric point'],
    },

    // ── PHYSICS (20 Chapters: Mechanics, Heat, Waves, Electromagnetism, Modern)
    {
      subject: 'Physics',
      classLevel: 'Class 11',
      badgeClass: 'badge-class11',
      name: 'Measurement, Vectors & Equilibrium',
      numMcqs: 6,
      topics: ['SI Base & Derived Units, Dimensional analysis', 'Precision, Accuracy & Significant figures', 'Vector Addition: Rectangular components', 'Scalar (Dot) and Vector (Cross) product', 'Conditions of Equilibrium: First & Second'],
    },
    {
      subject: 'Physics',
      classLevel: 'Class 11',
      badgeClass: 'badge-class11',
      name: 'Motion, Force & Momentum',
      numMcqs: 8,
      topics: ['Equations of uniformly accelerated motion', 'Newton’s Laws of Motion & Momentum conservation', 'Elastic vs Inelastic collisions in 1D & 2D', 'Impulse (J = F·Δt = Δp)', 'Projectile Motion: Height, Time of flight, Range'],
    },
    {
      subject: 'Physics',
      classLevel: 'Class 11',
      badgeClass: 'badge-class11',
      name: 'Work, Power & Energy',
      numMcqs: 7,
      topics: ['Work done by constant & variable force', 'Work-Energy Theorem (W = ΔKE)', 'Gravitational Potential Energy (mgh & -GMm/r)', 'Conservative vs Non-conservative forces', 'Power: P = W/t = F·v and Escape Velocity'],
    },
    {
      subject: 'Physics',
      classLevel: 'Class 11',
      badgeClass: 'badge-class11',
      name: 'Circular Motion & Gravitation',
      numMcqs: 6,
      topics: ['Angular displacement, velocity & acceleration', 'Centripetal Force (Fc = mv²/r = mrω²)', 'Banking of roads & Motion in vertical circle', 'Newton’s Law of Universal Gravitation', 'Geostationary satellites & Orbital speed'],
    },
    {
      subject: 'Physics',
      classLevel: 'Class 11',
      badgeClass: 'badge-class11',
      name: 'Fluid Dynamics',
      numMcqs: 5,
      topics: ['Viscosity & Stokes’ Law (F = 6πηrv)', 'Terminal velocity of falling sphere', 'Equation of Continuity (A₁v₁ = A₂v₂)', 'Bernoulli’s Principle & Medical applications (Blood flow)'],
    },
    {
      subject: 'Physics',
      classLevel: 'Class 11',
      badgeClass: 'badge-class11',
      name: 'Oscillations & Simple Harmonic Motion',
      numMcqs: 6,
      topics: ['Conditions for SHM (a = -ω²x)', 'Simple Pendulum period (T = 2π√(L/g))', 'Mass-Spring system (T = 2π√(m/k))', 'Energy conservation in SHM (KE + PE = Total)', 'Resonance, Sharpness & Damped oscillations'],
    },
    {
      subject: 'Physics',
      classLevel: 'Class 11',
      badgeClass: 'badge-class11',
      name: 'Waves, Sound & Doppler Effect',
      numMcqs: 7,
      topics: ['Transverse vs Longitudinal wave parameters', 'Speed of sound: Newton’s formula & Laplace correction', 'Superposition principle & Standing waves in strings/pipes', 'Beats frequency (f_beat = |f₁ - f₂|)', 'Doppler Effect for sound (Moving source & observer)'],
    },
    {
      subject: 'Physics',
      classLevel: 'Class 11',
      badgeClass: 'badge-class11',
      name: 'Thermodynamics',
      numMcqs: 7,
      topics: ['First Law of Thermodynamics (Q = ΔU + W)', 'Molar specific heats (Cp - Cv = R)', 'Isothermal, Adiabatic, Isochoric & Isobaric processes', 'Second Law of Thermodynamics & Entropy', 'Carnot Heat Engine efficiency (η = 1 - Tc/Th)'],
    },
    {
      subject: 'Physics',
      classLevel: 'Class 12',
      badgeClass: 'badge-class12',
      name: 'Electrostatics',
      numMcqs: 8,
      topics: ['Coulomb’s Law in vacuum & dielectric', 'Electric Field Intensity (E = F/q = kQ/r²)', 'Gauss’s Law & Electric Flux applications', 'Electric Potential (V = W/q = kQ/r)', 'Capacitors in series & parallel, Energy stored (½CV²)'],
    },
    {
      subject: 'Physics',
      classLevel: 'Class 12',
      badgeClass: 'badge-class12',
      name: 'Current Electricity',
      numMcqs: 8,
      topics: ['Ohm’s Law & Resistivity (R = ρL/A)', 'Temperature coefficient of resistance (α)', 'Internal Resistance & Terminal Potential Difference (Vt = ε - Ir)', 'Kirchhoff’s Current & Voltage Rules (KCL & KVL)', 'Wheatstone Bridge & Potentiometer principle'],
    },
    {
      subject: 'Physics',
      classLevel: 'Class 12',
      badgeClass: 'badge-class12',
      name: 'Electromagnetism & Induction',
      numMcqs: 8,
      topics: ['Magnetic force on moving charge (F = qvB sinθ)', 'Force on current-carrying conductor (F = ILB sinθ)', 'Faraday’s Law of Electromagnetic Induction', 'Lenz’s Law & Direction of induced current', 'Motional EMF & Ideal Transformer equations'],
    },
    {
      subject: 'Physics',
      classLevel: 'Class 12',
      badgeClass: 'badge-class12',
      name: 'Alternating Current (AC)',
      numMcqs: 6,
      topics: ['AC values: Peak, Peak-to-Peak & RMS (I_rms = I₀/√2)', 'AC through Resistor, Inductor & Capacitor', 'Impedance (Z) in series RLC circuits', 'Resonance frequency (fr = 1 / (2π√(LC)))', 'Power in AC circuits & Power factor'],
    },
    {
      subject: 'Physics',
      classLevel: 'Class 12',
      badgeClass: 'badge-class12',
      name: 'Physics of Solids & Electronics',
      numMcqs: 6,
      topics: ['Stress, Strain & Young’s Modulus', 'Energy Band Theory: Conductors, Insulators, Semiconductors', 'p-n Junction Diode: Forward & Reverse bias', 'Half-Wave & Full-Wave Rectification', 'Operational Amplifier (Inverting & Non-inverting gain)'],
    },
    {
      subject: 'Physics',
      classLevel: 'Class 12',
      badgeClass: 'badge-class12',
      name: 'Dawn of Modern Physics & Atomic Spectra',
      numMcqs: 8,
      topics: ['Blackbody Radiation & Planck’s Quantum Hypothesis', 'Photoelectric Effect equation (hf = Φ + KE_max)', 'Compton Effect & de Broglie wavelength (λ = h/p)', 'Bohr’s Postulates & Hydrogen Energy levels (En = -13.6/n² eV)', 'Spectral Series: Lyman (UV), Balmer (Visible), Paschen (IR)'],
    },
    {
      subject: 'Physics',
      classLevel: 'Class 12',
      badgeClass: 'badge-class12',
      name: 'Nuclear Physics & Radioactivity',
      numMcqs: 7,
      topics: ['Atomic nucleus: Mass defect & Binding Energy per nucleon', 'Radioactive Decay Law (N = N₀ e^(-λt))', 'Half-Life period (t₁/₂ = 0.693 / λ)', 'Alpha, Beta & Gamma radiation properties', 'Nuclear Fission vs Nuclear Fusion reactions'],
    },

    // ── ENGLISH (4 Chapters)
    {
      subject: 'English',
      classLevel: 'MDCAT Core',
      badgeClass: 'badge-foundation',
      name: 'Vocabulary in Context & Lexical Precision',
      numMcqs: 5,
      topics: ['Contextual Clues & Tone recognition', 'High-frequency PMDC 100 Word bank', 'Synonym & Antonym distinction in scientific prose', 'Root words, Prefixes and Suffixes'],
    },
    {
      subject: 'English',
      classLevel: 'MDCAT Core',
      badgeClass: 'badge-foundation',
      name: 'Grammar & Sentence Mechanics',
      numMcqs: 5,
      topics: ['Subject-Verb Agreement rules (Neither/Nor, Either/Or)', 'Tense consistency & Conditional sentences (Types 0, 1, 2, 3)', 'Active and Passive Voice transformations', 'Direct and Indirect Speech conversions'],
    },
    {
      subject: 'English',
      classLevel: 'MDCAT Core',
      badgeClass: 'badge-foundation',
      name: 'Sentence Correction & Syntax',
      numMcqs: 4,
      topics: ['Dangling & Misplaced Modifiers', 'Parallel Structure in compound/complex clauses', 'Pronoun-Antecedent Agreement', 'Appropriate Prepositions & Idiomatic expressions'],
    },
    {
      subject: 'English',
      classLevel: 'MDCAT Core',
      badgeClass: 'badge-foundation',
      name: 'Reading Comprehension',
      numMcqs: 4,
      topics: ['Main Idea identification', 'Inference vs Stated fact', 'Author’s purpose and attitude', 'Deducing unfamiliar words from context'],
    },

    // ── LOGICAL REASONING (4 Chapters)
    {
      subject: 'Logical Reasoning',
      classLevel: 'MDCAT Core',
      badgeClass: 'badge-foundation',
      name: 'Critical Thinking & Deductive Arguments',
      numMcqs: 3,
      topics: ['Premises vs Conclusions', 'Identifying flawed assumptions', 'Strengthening vs Weakening arguments', 'Valid vs Invalid inferences'],
    },
    {
      subject: 'Logical Reasoning',
      classLevel: 'MDCAT Core',
      badgeClass: 'badge-foundation',
      name: 'Letter, Number & Symbol Sequences',
      numMcqs: 3,
      topics: ['Arithmetic & Geometric progression patterns', 'Alternating number series', 'Alphabetical position mapping (A=1, Z=26)', 'Matrix and grid completion'],
    },
    {
      subject: 'Logical Reasoning',
      classLevel: 'MDCAT Core',
      badgeClass: 'badge-foundation',
      name: 'Syllogisms & Categorical Logic',
      numMcqs: 3,
      topics: ['Universal Affirmative (All A are B)', 'Particular Affirmative (Some A are B)', 'Universal Negative (No A is B)', 'Venn Diagram representation of statements'],
    },
    {
      subject: 'Logical Reasoning',
      classLevel: 'MDCAT Core',
      badgeClass: 'badge-foundation',
      name: 'Cause & Effect / Course of Action',
      numMcqs: 3,
      topics: ['Distinguishing Immediate cause vs Principal cause', 'Common cause vs Independent causes', 'Feasibility and relevance of proposed courses of action', 'Data sufficiency scenarios'],
    },
  ],

  // ── 2. HIGH-RESOLUTION LABELED SVG DIAGRAMS ─────────────────────
  diagrams: [
    {
      id: 'diag-cell',
      subject: 'Biology',
      title: 'Animal Cell vs Plant Cell Architecture',
      desc: 'Comparative ultrastructure: Plant cells have a rigid cellulose cell wall, large central vacuole, and chloroplasts. Animal cells have centrioles, lysosomes, and dynamic shapes.',
      svg: `<svg viewBox="0 0 760 380" fill="none" xmlns="http://www.w3.org/2000/svg" style="background:#0b1120;border-radius:12px;">
        <!-- Animal Cell on Left -->
        <g transform="translate(40, 20)">
          <text x="140" y="24" fill="#38bdf8" font-size="16" font-weight="bold" text-anchor="middle">ANIMAL CELL</text>
          <!-- Cell Membrane -->
          <ellipse cx="140" cy="180" rx="130" ry="120" fill="#1e293b" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="6 2"/>
          <text x="140" y="70" fill="#94a3b8" font-size="11" text-anchor="middle">Plasma Membrane (Lipid Bilayer)</text>
          <!-- Nucleus -->
          <circle cx="140" cy="180" r="42" fill="#312e81" stroke="#818cf8" stroke-width="2"/>
          <circle cx="140" cy="180" r="18" fill="#4338ca"/>
          <text x="140" y="184" fill="#e0e7ff" font-size="11" font-weight="bold" text-anchor="middle">Nucleus</text>
          <!-- Mitochondria -->
          <ellipse cx="75" cy="140" rx="22" ry="12" fill="#7f1d1d" stroke="#f87171" stroke-width="1.5" transform="rotate(-25 75 140)"/>
          <text x="50" y="115" fill="#fca5a5" font-size="10">Mitochondria (70S)</text>
          <!-- Centrioles -->
          <rect x="180" y="125" width="16" height="6" fill="#fbbf24" transform="rotate(45 180 125)"/>
          <rect x="180" y="125" width="16" height="6" fill="#fbbf24" transform="rotate(-45 180 125)"/>
          <text x="200" y="120" fill="#fde68a" font-size="10">Centrioles (Animal only)</text>
          <!-- Lysosome -->
          <circle cx="90" cy="240" r="10" fill="#047857" stroke="#34d399" stroke-width="1.5"/>
          <text x="40" y="270" fill="#6ee7b7" font-size="10">Lysosome (Acid hydrolases)</text>
          <!-- Ribosomes -->
          <circle cx="190" cy="220" r="3" fill="#cbd5e1"/>
          <circle cx="198" cy="225" r="3" fill="#cbd5e1"/>
          <circle cx="185" cy="232" r="3" fill="#cbd5e1"/>
          <text x="210" y="240" fill="#cbd5e1" font-size="10">80S Ribosomes</text>
        </g>

        <!-- Divider Line -->
        <line x1="380" y1="20" x2="380" y2="360" stroke="#334155" stroke-width="2" stroke-dasharray="4 4"/>

        <!-- Plant Cell on Right -->
        <g transform="translate(420, 20)">
          <text x="150" y="24" fill="#34d399" font-size="16" font-weight="bold" text-anchor="middle">PLANT CELL</text>
          <!-- Rigid Cell Wall -->
          <rect x="20" y="50" width="260" height="260" rx="20" fill="#064e3b" stroke="#10b981" stroke-width="4"/>
          <!-- Inner Plasma Membrane -->
          <rect x="28" y="58" width="244" height="244" rx="16" fill="#0f172a" stroke="#34d399" stroke-width="1.5"/>
          <!-- Central Vacuole -->
          <rect x="70" y="100" width="140" height="130" rx="30" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
          <text x="140" y="170" fill="#bae6fd" font-size="12" font-weight="bold" text-anchor="middle">Central Vacuole</text>
          <text x="140" y="186" fill="#7dd3fc" font-size="9" text-anchor="middle">(Turgor Pressure)</text>
          <!-- Nucleus (Pushed to periphery) -->
          <circle cx="230" cy="110" r="26" fill="#312e81" stroke="#818cf8" stroke-width="1.5"/>
          <text x="230" y="114" fill="#e0e7ff" font-size="9" font-weight="bold" text-anchor="middle">Nucleus</text>
          <!-- Chloroplasts -->
          <ellipse cx="58" cy="100" rx="16" ry="10" fill="#14532d" stroke="#4ade80" stroke-width="1.5" transform="rotate(30 58 100)"/>
          <ellipse cx="65" cy="250" rx="16" ry="10" fill="#14532d" stroke="#4ade80" stroke-width="1.5" transform="rotate(-20 65 250)"/>
          <text x="35" y="285" fill="#86efac" font-size="10">Chloroplast (Thylakoids)</text>
          <!-- Cell Wall Label -->
          <text x="150" y="335" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Cellulose Cell Wall (No Centrioles)</text>
        </g>
      </svg>`,
      caption: 'Figure 1: Comparison of eukaryotic animal and plant cells. Notice organelle localization and wall structures.',
    },
    {
      id: 'diag-nephron',
      subject: 'Biology',
      title: 'Kidney Nephron & Countercurrent Multiplier',
      desc: 'Glomerulus filters blood under pressure (Ultrafiltration). Loop of Henle maintains high osmotic gradient in medulla for water reabsorption under ADH stimulation.',
      svg: `<svg viewBox="0 0 760 360" fill="none" xmlns="http://www.w3.org/2000/svg" style="background:#0b1120;border-radius:12px;">
        <g transform="translate(60, 20)">
          <!-- Cortex / Medulla boundary -->
          <rect x="0" y="0" width="640" height="130" fill="rgba(56,189,248,0.04)"/>
          <line x1="0" y1="130" x2="640" y2="130" stroke="#334155" stroke-dasharray="4 4"/>
          <text x="10" y="25" fill="#38bdf8" font-size="12" font-weight="bold">RENAL CORTEX (Isosmotic ~300 mOsm/L)</text>
          <text x="10" y="150" fill="#fbbf24" font-size="12" font-weight="bold">RENAL MEDULLA (Hyperosmotic ~1200 mOsm/L)</text>

          <!-- Bowman's Capsule & Glomerulus -->
          <path d="M 80 40 C 40 40 40 100 80 100" fill="none" stroke="#fbbf24" stroke-width="4"/>
          <circle cx="70" cy="70" r="18" fill="#ef4444" stroke="#f87171" stroke-width="2"/>
          <text x="70" y="74" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">Glomerulus</text>
          <text x="15" y="105" fill="#fca5a5" font-size="10">Ultrafiltration</text>

          <!-- Proximal Convoluted Tubule (PCT) -->
          <path d="M 80 40 Q 120 20 140 60 T 180 80" fill="none" stroke="#fbbf24" stroke-width="4"/>
          <text x="120" y="18" fill="#fde68a" font-size="10">PCT (65% Reabsorption of H₂O & Na⁺)</text>

          <!-- Descending Limb (Water permeable) -->
          <path d="M 180 80 L 180 270" fill="none" stroke="#38bdf8" stroke-width="4"/>
          <text x="90" y="200" fill="#7dd3fc" font-size="10">Descending Limb</text>
          <text x="110" y="215" fill="#38bdf8" font-size="9">(H₂O out → Hypertonic)</text>

          <!-- Hairpin loop -->
          <path d="M 180 270 Q 210 300 240 270" fill="none" stroke="#a78bfa" stroke-width="4"/>

          <!-- Ascending Limb (Impermeable to water, pumps NaCl) -->
          <path d="M 240 270 L 240 80" fill="none" stroke="#f43f5e" stroke-width="4"/>
          <text x="250" y="200" fill="#fda4af" font-size="10">Ascending Limb</text>
          <text x="250" y="215" fill="#f43f5e" font-size="9">(Active NaCl pump out)</text>

          <!-- Distal Convoluted Tubule (DCT) -->
          <path d="M 240 80 Q 280 40 330 60 T 380 60" fill="none" stroke="#fbbf24" stroke-width="4"/>
          <text x="270" y="35" fill="#fde68a" font-size="10">DCT (Aldosterone site)</text>

          <!-- Collecting Duct -->
          <path d="M 380 40 L 380 300" fill="none" stroke="#34d399" stroke-width="5"/>
          <text x="400" y="160" fill="#6ee7b7" font-size="11" font-weight="bold">Collecting Duct</text>
          <text x="400" y="178" fill="#a7f3d0" font-size="10">+ ADH: Concentrated Urine</text>
          <text x="400" y="194" fill="#a7f3d0" font-size="10">- ADH: Dilute Urine</text>
        </g>
      </svg>`,
      caption: 'Figure 2: Functional nephron architecture showing ultrafiltration, countercurrent multiplication, and ADH action.',
    },
    {
      id: 'diag-circuits',
      subject: 'Physics',
      title: 'Electrical Circuits: Series vs Parallel Resistors',
      desc: 'In Series: Same current I flows through all resistors; voltages add up (V = V₁ + V₂). In Parallel: Same voltage V across each branch; currents add up (I = I₁ + I₂).',
      svg: `<svg viewBox="0 0 760 320" fill="none" xmlns="http://www.w3.org/2000/svg" style="background:#0b1120;border-radius:12px;">
        <!-- Series Circuit Left -->
        <g transform="translate(40, 20)">
          <text x="140" y="24" fill="#38bdf8" font-size="15" font-weight="bold" text-anchor="middle">SERIES CIRCUIT</text>
          <!-- Wires -->
          <path d="M 40 80 L 80 80" stroke="#94a3b8" stroke-width="3"/>
          <!-- R1 -->
          <path d="M 80 80 L 90 70 L 105 90 L 120 70 L 135 90 L 145 80" stroke="#38bdf8" stroke-width="3" fill="none"/>
          <text x="112" y="60" fill="#7dd3fc" font-size="12" font-weight="bold" text-anchor="middle">R₁</text>
          <!-- Middle wire -->
          <path d="M 145 80 L 175 80" stroke="#94a3b8" stroke-width="3"/>
          <!-- R2 -->
          <path d="M 175 80 L 185 70 L 200 90 L 215 70 L 230 90 L 240 80" stroke="#38bdf8" stroke-width="3" fill="none"/>
          <text x="207" y="60" fill="#7dd3fc" font-size="12" font-weight="bold" text-anchor="middle">R₂</text>
          <!-- Remaining loop -->
          <path d="M 240 80 L 260 80 L 260 180 L 170 180" stroke="#94a3b8" stroke-width="3"/>
          <path d="M 40 80 L 40 180 L 130 180" stroke="#94a3b8" stroke-width="3"/>
          <!-- Battery -->
          <line x1="130" y1="170" x2="130" y2="190" stroke="#f87171" stroke-width="4"/>
          <line x1="145" y1="160" x2="145" y2="200" stroke="#4ade80" stroke-width="4"/>
          <line x1="155" y1="170" x2="155" y2="190" stroke="#f87171" stroke-width="4"/>
          <line x1="170" y1="160" x2="170" y2="200" stroke="#4ade80" stroke-width="4"/>
          <text x="150" y="220" fill="#cbd5e1" font-size="11" text-anchor="middle">Battery (V)</text>
          <!-- Formula Box -->
          <rect x="20" y="240" width="240" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="140" y="260" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">R_eq = R₁ + R₂</text>
          <text x="140" y="278" fill="#94a3b8" font-size="11" text-anchor="middle">Current I is CONSTANT · V = V₁ + V₂</text>
        </g>

        <!-- Divider Line -->
        <line x1="380" y1="20" x2="380" y2="300" stroke="#334155" stroke-width="2" stroke-dasharray="4 4"/>

        <!-- Parallel Circuit Right -->
        <g transform="translate(420, 20)">
          <text x="150" y="24" fill="#34d399" font-size="15" font-weight="bold" text-anchor="middle">PARALLEL CIRCUIT</text>
          <!-- Main Bus Wires -->
          <path d="M 40 120 L 80 120 L 80 70 L 110 70" stroke="#94a3b8" stroke-width="3"/>
          <path d="M 80 120 L 80 170 L 110 170" stroke="#94a3b8" stroke-width="3"/>
          <!-- R1 branch -->
          <path d="M 110 70 L 120 60 L 135 80 L 150 60 L 165 80 L 175 70" stroke="#34d399" stroke-width="3" fill="none"/>
          <text x="142" y="50" fill="#86efac" font-size="12" font-weight="bold" text-anchor="middle">R₁</text>
          <!-- R2 branch -->
          <path d="M 110 170 L 120 160 L 135 180 L 150 160 L 165 180 L 175 170" stroke="#34d399" stroke-width="3" fill="none"/>
          <text x="142" y="150" fill="#86efac" font-size="12" font-weight="bold" text-anchor="middle">R₂</text>
          <!-- Right side junctions -->
          <path d="M 175 70 L 210 70 L 210 120 L 250 120" stroke="#94a3b8" stroke-width="3"/>
          <path d="M 175 170 L 210 170 L 210 120" stroke="#94a3b8" stroke-width="3"/>
          <!-- Loop to Battery -->
          <path d="M 40 120 L 40 210 L 120 210" stroke="#94a3b8" stroke-width="3"/>
          <path d="M 250 120 L 250 210 L 170 210" stroke="#94a3b8" stroke-width="3"/>
          <!-- Battery -->
          <line x1="130" y1="200" x2="130" y2="220" stroke="#f87171" stroke-width="4"/>
          <line x1="145" y1="190" x2="145" y2="230" stroke="#4ade80" stroke-width="4"/>
          <line x1="155" y1="200" x2="155" y2="220" stroke="#f87171" stroke-width="4"/>
          <line x1="170" y1="190" x2="170" y2="230" stroke="#4ade80" stroke-width="4"/>
          <!-- Formula Box -->
          <rect x="30" y="240" width="240" height="50" rx="8" fill="#1e293b" stroke="#34d399" stroke-width="1.5"/>
          <text x="150" y="260" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">1/R_eq = 1/R₁ + 1/R₂</text>
          <text x="150" y="278" fill="#94a3b8" font-size="11" text-anchor="middle">Voltage V is CONSTANT · I = I₁ + I₂</text>
        </g>
      </svg>`,
      caption: 'Figure 3: Current and voltage distribution in Series vs Parallel circuits for MDCAT problem-solving.',
    },
    {
      id: 'diag-benzene',
      subject: 'Chemistry',
      title: 'Benzene Delocalized Ring & Electrophilic Substitution',
      desc: 'The six sp² carbons form a planar hexagonal ring with 6 delocalized π-electrons above and below the plane, providing remarkable aromatic resonance stability (150.5 kJ/mol).',
      svg: `<svg viewBox="0 0 760 300" fill="none" xmlns="http://www.w3.org/2000/svg" style="background:#0b1120;border-radius:12px;">
        <g transform="translate(80, 30)">
          <!-- Kekule Structures -->
          <text x="100" y="20" fill="#fbbf24" font-size="14" font-weight="bold" text-anchor="middle">Kekulé Resonance Forms</text>
          <!-- Hexagon 1 -->
          <polygon points="100,50 145,75 145,125 100,150 55,125 55,75" stroke="#38bdf8" stroke-width="2.5" fill="none"/>
          <line x1="62" y1="78" x2="98" y2="58" stroke="#38bdf8" stroke-width="2.5"/>
          <line x1="138" y1="80" x2="138" y2="120" stroke="#38bdf8" stroke-width="2.5"/>
          <line x1="62" y1="122" x2="98" y2="142" stroke="#38bdf8" stroke-width="2.5"/>

          <!-- Resonance Double Arrow -->
          <text x="180" y="110" fill="#e2e8f0" font-size="28" text-anchor="middle">⇌</text>

          <!-- Hexagon 2 -->
          <polygon points="260,50 305,75 305,125 260,150 215,125 215,75" stroke="#38bdf8" stroke-width="2.5" fill="none"/>
          <line x1="215" y1="80" x2="215" y2="120" stroke="#38bdf8" stroke-width="2.5"/>
          <line x1="262" y1="58" x2="298" y2="78" stroke="#38bdf8" stroke-width="2.5"/>
          <line x1="222" y1="122" x2="258" y2="142" stroke="#38bdf8" stroke-width="2.5"/>

          <!-- Modern Delocalized Hybrid -->
          <g transform="translate(360, 0)">
            <text x="140" y="20" fill="#34d399" font-size="14" font-weight="bold" text-anchor="middle">Aromatic π-Cloud Hybrid</text>
            <polygon points="140,50 185,75 185,125 140,150 95,125 95,75" stroke="#34d399" stroke-width="3" fill="none"/>
            <circle cx="140" cy="100" r="28" stroke="#34d399" stroke-width="2" stroke-dasharray="5 3" fill="rgba(52,211,153,0.1)"/>
            <text x="140" y="180" fill="#a7f3d0" font-size="11" text-anchor="middle">Planar · C-C bond length: 1.397 Å</text>
            <text x="140" y="196" fill="#6ee7b7" font-size="10" text-anchor="middle">(Intermediate between single & double bond)</text>
          </g>

          <!-- Mechanism Note Below -->
          <rect x="20" y="215" width="560" height="45" rx="8" fill="#1e293b" stroke="#334155"/>
          <text x="300" y="242" fill="#fbbf24" font-size="12" text-anchor="middle">⚡ Undergoes Electrophilic Substitution (Not Addition) to preserve 150.5 kJ/mol Resonance Energy!</text>
        </g>
      </svg>`,
      caption: 'Figure 4: The delocalized aromatic sextet in benzene explaining why benzene undergoes substitution rather than addition.',
    },
    {
      id: 'diag-wave',
      subject: 'Physics',
      title: 'Transverse Wave Anatomy: Wavelength (λ) & Amplitude (A)',
      desc: 'Particles oscillate perpendicular to wave propagation. Distance between consecutive crests is wavelength λ. Wave speed v = f·λ.',
      svg: `<svg viewBox="0 0 760 260" fill="none" xmlns="http://www.w3.org/2000/svg" style="background:#0b1120;border-radius:12px;">
        <g transform="translate(50, 30)">
          <!-- Equilibrium Line -->
          <line x1="20" y1="100" x2="650" y2="100" stroke="#475569" stroke-width="2" stroke-dasharray="4 4"/>
          <text x="660" y="104" fill="#94a3b8" font-size="11">Rest Position</text>

          <!-- Wave Sine Path -->
          <path d="M 40 100 Q 115 10 190 100 T 340 100 T 490 100 T 640 100" stroke="#38bdf8" stroke-width="3.5" fill="none"/>

          <!-- Crest Callout -->
          <circle cx="115" cy="10" r="4" fill="#38bdf8"/>
          <text x="115" y="-2" fill="#7dd3fc" font-size="12" font-weight="bold" text-anchor="middle">Crest</text>

          <!-- Trough Callout -->
          <circle cx="265" cy="190" r="4" fill="#f43f5e"/>
          <text x="265" y="212" fill="#fda4af" font-size="12" font-weight="bold" text-anchor="middle">Trough</text>

          <!-- Amplitude (A) -->
          <line x1="115" y1="10" x2="115" y2="100" stroke="#fbbf24" stroke-width="2"/>
          <text x="125" y="55" fill="#fde68a" font-size="11" font-weight="bold">Amplitude (A)</text>

          <!-- Wavelength (λ) between crests -->
          <line x1="115" y1="0" x2="415" y2="0" stroke="#34d399" stroke-width="2.5"/>
          <polygon points="115,0 125,-4 125,4" fill="#34d399"/>
          <polygon points="415,0 405,-4 405,4" fill="#34d399"/>
          <text x="265" y="-6" fill="#86efac" font-size="13" font-weight="bold" text-anchor="middle">Wavelength (λ)</text>

          <!-- Formula strip -->
          <rect x="160" y="170" width="340" height="35" rx="6" fill="#1e293b" stroke="#334155"/>
          <text x="330" y="193" fill="#e2e8f0" font-size="12" font-weight="bold" text-anchor="middle">Wave Equation: v = f · λ  |  T = 1 / f</text>
        </g>
      </svg>`,
      caption: 'Figure 5: Fundamental anatomical wave parameters: wavelength λ, amplitude A, frequency f, and wave velocity v.',
    },
  ],

  // ── 3. HIGH-YIELD FORMULAS (PHYSICS & CHEMISTRY) ───────────────
  formulas: [
    {
      subject: 'Physics',
      tag: 'tag-phys',
      title: 'Uniformly Accelerated Motion & Gravity',
      formula: 'v = u + at  |  s = ut + ½at²  |  v² = u² + 2as',
      desc: 'Valid when acceleration is constant. In free fall under gravity, set a = g (9.8 m/s² or ≈10 m/s²). Distance in nth second: s_n = u + ½a(2n - 1).',
      details: ['v: Final velocity (m/s)', 'u: Initial velocity (m/s)', 'a: Acceleration (m/s²)', 's: Displacement (m)', 't: Time (s)'],
    },
    {
      subject: 'Physics',
      tag: 'tag-phys',
      title: 'Newton’s Second Law, Momentum & Impulse',
      formula: 'F = ma = Δp / Δt  |  p = mv  |  J = F·Δt = Δp',
      desc: 'Impulse J equals change in momentum. In an isolated system, total linear momentum is strictly conserved: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂.',
      details: ['Force unit: Newton (N = kg·m/s²)', 'Momentum unit: N·s or kg·m/s', 'Work-energy theorem: Net Work = ΔKE'],
    },
    {
      subject: 'Physics',
      tag: 'tag-phys',
      title: 'Work, Kinetic Energy, Potential Energy & Power',
      formula: 'W = F·d·cos(θ)  |  KE = ½mv² = p²/(2m)  |  PE = mgh  |  P = W/t = F·v',
      desc: 'Work is zero if displacement is perpendicular to force (θ = 90°), such as centripetal force in circular orbit.',
      details: ['1 Horsepower (hp) = 746 Watts', '1 kilowatt-hour (kWh) = 3.6 × 10⁶ Joules', 'Escape velocity: v_esc = √(2gR) ≈ 11.2 km/s'],
    },
    {
      subject: 'Physics',
      tag: 'tag-phys',
      title: 'Coulomb’s Law, Electric Field & Capacitance',
      formula: 'F = k·|q₁q₂|/r²  |  E = F/q = k·q/r²  |  V = k·q/r  |  C = Q/V = ε₀ε_r·A/d',
      desc: 'k = 1/(4πε₀) ≈ 9 × 10⁹ N·m²/C². In dielectric medium, electrostatic force decreases by relative permittivity: F_med = F_vac / ε_r.',
      details: ['Electric field inside a hollow charged sphere is ZERO', 'Energy in capacitor: U = ½CV² = ½QV = Q²/(2C)', 'Capacitors in parallel: C_eq = C₁ + C₂'],
    },
    {
      subject: 'Physics',
      tag: 'tag-phys',
      title: 'Ohm’s Law, Resistivity & Kirchhoff’s Rules',
      formula: 'V = IR  |  R = ρ·L / A  |  P = VI = I²R = V²/R  |  Vt = ε - Ir',
      desc: 'Series resistors add directly (R_eq = R₁ + R₂). Parallel resistors add inversely (1/R_eq = 1/R₁ + 1/R₂). KCL: ΣI = 0 (charge conservation). KVL: ΣV = 0 (energy conservation).',
      details: ['Resistivity ρ unit: Ω·m', 'Conductivity σ = 1/ρ', 'Temperature dependence: R_t = R₀(1 + αΔT)'],
    },
    {
      subject: 'Physics',
      tag: 'tag-phys',
      title: 'Photon Energy, Photoelectric Effect & de Broglie',
      formula: 'E = hf = hc / λ  |  hf = Φ + KE_max  |  λ = h / p = h / (mv)',
      desc: 'Planck’s constant h = 6.63 × 10⁻³⁴ J·s. Work function Φ = hf₀ where f₀ is threshold frequency. Stopping potential: eV₀ = KE_max.',
      details: ['c = 3 × 10⁸ m/s', '1 eV = 1.6 × 10⁻¹⁹ Joules', 'Momentum of photon: p = h / λ = E / c'],
    },
    {
      subject: 'Physics',
      tag: 'tag-phys',
      title: 'Radioactive Decay & Half-Life Law',
      formula: 'N = N₀ · (½)^n  |  t₁/₂ = 0.693 / λ  |  n = t / t₁/₂',
      desc: 'Where n is number of half-lives. Fraction remaining after n half-lives = (½)^n. Fraction decayed = 1 - (½)^n.',
      details: ['After 1 half-life: 50% remains', 'After 2 half-lives: 25% remains', 'After 3 half-lives: 12.5% remains (⅛)'],
    },
    {
      subject: 'Chemistry',
      tag: 'tag-chem',
      title: 'Mole Concept & Gas Laws',
      formula: 'n = mass / M = V_dm³ / 22.4  |  PV = nRT  |  P₁V₁/T₁ = P₂V₂/T₂',
      desc: 'At STP (0°C, 1 atm), 1 mole of any ideal gas occupies 22.414 dm³. R = 0.0821 atm·dm³/(mol·K) = 8.314 J/(mol·K).',
      details: ['Avogadro’s constant: N_A = 6.022 × 10²³ entities/mol', 'Dalton’s partial pressure: P_A = X_A · P_total', 'Graham’s Law: r₁/r₂ = √(M₂/M₁)'],
    },
    {
      subject: 'Chemistry',
      tag: 'tag-chem',
      title: 'pH, pOH & Ionic Product of Water (Kw)',
      formula: 'pH = -log[H⁺]  |  pOH = -log[OH⁻]  |  pH + pOH = 14 (at 25°C)',
      desc: 'Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 298 K. Henderson-Hasselbalch equation for buffer solutions: pH = pKa + log([Conjugate Base]/[Acid]).',
      details: ['Strong acid (HCl 0.01M) → [H⁺] = 10⁻² → pH = 2', 'Strong base (NaOH 0.001M) → [OH⁻] = 10⁻³ → pOH = 3 → pH = 11', 'Ka · Kb = Kw'],
    },
    {
      subject: 'Chemistry',
      tag: 'tag-chem',
      title: 'Standard Cell Potential & Nernst Equation',
      formula: 'E°_cell = E°_cathode - E°_anode  |  ΔG° = -nFE°_cell',
      desc: 'Spontaneous reaction requires E°_cell > 0 and ΔG° < 0. Reduction occurs at Cathode (RED CAT); Oxidation occurs at Anode (AN OX).',
      details: ['Faraday constant F ≈ 96,500 C/mol', 'Standard conditions: 298 K, 1 atm, 1 M ionic concentration'],
    },
  ],

  // ── 4. BIOLOGY STUDY NOTES & TABLES ────────────────────────────
  biology: [
    {
      subject: 'Biology',
      tag: 'tag-bio',
      title: 'Biological Macromolecules Summary',
      formula: 'Carbohydrates · Proteins · Lipids · Nucleic Acids',
      desc: 'Comparison of the four major organic polymers, their constituent monomers, linkage types, and clinical physiological roles.',
      details: [
        'Carbohydrates: Monosaccharides joined by Glycosidic bonds. Starch = plant storage, Glycogen = animal liver/muscle storage, Cellulose = plant wall.',
        'Proteins: Amino acids joined by Peptide bonds (-CONH-). 4 Structural tiers: Primary (sequence), Secondary (α-helix, β-sheet via H-bonds), Tertiary (3D folding), Quaternary (multi-subunit like Hemoglobin).',
        'Lipids: Hydrophobic non-polymers. Triglyceride = Glycerol + 3 Fatty acids via Ester bonds. Phospholipids form amphipathic cell membranes.',
        'Nucleic Acids: Nucleotides (Sugar + Phosphate + Nitrogenous base) joined by Phosphodiester bonds. DNA stores code, RNA synthesizes protein.',
      ],
      table: {
        headers: ['Macromolecule', 'Monomer', 'Bond / Linkage', 'MDCAT High-Yield Function'],
        rows: [
          ['Carbohydrate', 'Monosaccharide (Glucose)', 'Glycosidic bond', 'Primary cellular fuel (ATP production)'],
          ['Protein', 'Amino acid (20 types)', 'Peptide bond (-CONH-)', 'Enzymes, antibodies, cellular transporters'],
          ['Lipid', 'Fatty acids + Glycerol', 'Ester linkage', 'Long-term energy, membrane bilayer, insulation'],
          ['Nucleic Acid', 'Nucleotide', 'Phosphodiester bond', 'Genetic storage (DNA) & Protein synthesis (RNA)'],
        ]
      },
      tip: '⭐ MDCAT Tip: Lipids are NOT true polymers because they lack identical repeating monomers. They are esterified aggregates.',
    },
    {
      subject: 'Biology',
      tag: 'tag-bio',
      title: 'Prokaryotic vs Eukaryotic Cells Comparison',
      formula: '70S vs 80S Ribosomes · Nucleoid vs True Nucleus',
      desc: 'Fundamental structural divergences tested in both Biology and Microbiology questions.',
      details: [
        'Prokaryotes: 1-10 μm, no nuclear membrane, circular DNA without histones, 70S ribosomes (50S + 30S), binary fission.',
        'Eukaryotes: 10-100 μm, membrane-bound nucleus, linear DNA with histones, 80S ribosomes (60S + 40S), mitosis/meiosis.',
        'Endosymbiotic Theory: Mitochondria & Chloroplasts possess circular DNA and 70S ribosomes, confirming prokaryotic origins.',
      ],
      table: {
        headers: ['Characteristic', 'Prokaryotic Cell', 'Eukaryotic Cell'],
        rows: [
          ['Nucleus', 'Absent (Nucleoid region)', 'Present with nuclear envelope'],
          ['Ribosomes', '70S (50S + 30S)', '80S (60S + 40S in cytosol)'],
          ['Membrane Organelles', 'None', 'Present (ER, Golgi, Mitochondria)'],
          ['Cell Wall', 'Peptidoglycan (Murein)', 'Cellulose (Plants) or Chitin (Fungi)'],
          ['DNA Structure', 'Circular, naked (no histones)', 'Linear, packaged with histone proteins'],
        ]
      },
      tip: '💡 Endosymbiosis Evidence: Mitochondria divide by binary fission, contain circular DNA, and 70S ribosomes, just like bacteria!',
    },
    {
      subject: 'Biology',
      tag: 'tag-bio',
      title: 'Human Endocrine Hormones & Regulatory Loops',
      formula: 'Anterior/Posterior Pituitary · Adrenal · Pancreas · Thyroid',
      desc: 'Critical physiological hormone actions frequently appearing on past papers.',
      details: [
        'Insulin (Pancreatic β-cells): Lowers blood glucose by driving glucose into cells and triggering glycogenesis.',
        'Glucagon (Pancreatic α-cells): Elevates blood glucose through glycogenolysis in liver and gluconeogenesis.',
        'ADH / Vasopressin (Posterior pituitary): Stimulates aquaporins in kidney collecting ducts to reabsorb water.',
        'Aldosterone (Adrenal cortex): Promotes Na⁺ reabsorption and K⁺ excretion in distal nephron tubules.',
        'Calcitonin (Thyroid) lowers blood Ca²⁺; Parathyroid Hormone (PTH) elevates blood Ca²⁺ by activating osteoclasts.',
      ],
      table: {
        headers: ['Hormone', 'Gland / Source', 'Target Organ', 'Biological Action'],
        rows: [
          ['Insulin', 'Pancreas (β-cells)', 'Liver, Muscle, Adipose', 'Lowers blood glucose (Glycogenesis)'],
          ['Glucagon', 'Pancreas (α-cells)', 'Liver', 'Raises blood glucose (Glycogenolysis)'],
          ['ADH (Vasopressin)', 'Posterior Pituitary', 'Kidney Collecting Ducts', 'Increases water reabsorption'],
          ['Aldosterone', 'Adrenal Cortex', 'Kidney Distal Tubules', 'Reabsorbs Na⁺, secretes K⁺'],
          ['Thyroxine (T₄)', 'Thyroid Gland', 'All body cells', 'Regulates Basal Metabolic Rate (BMR)'],
        ]
      },
      warning: '⚠️ Common Pitfall: ADH is synthesized in the HYPOTHALAMUS, but stored and secreted by the POSTERIOR PITUITARY.',
    },
  ],

  // ── 5. CHEMISTRY STUDY NOTES & TABLES ──────────────────────────
  chemistry: [
    {
      subject: 'Chemistry',
      tag: 'tag-chem',
      title: 'Chemical Equilibrium & Le Chatelier’s Principle',
      formula: 'Kc = [Products]^p / [Reactants]^r  |  Dynamic Equilibrium',
      desc: 'At dynamic equilibrium, forward reaction rate = reverse reaction rate. Concentrations remain CONSTANT, not equal.',
      details: [
        'Adding Reactant: Shifts Forward (→); Adding Product: Shifts Backward (←).',
        'Pressure Increase (Gases): Shifts toward the side with FEWER moles of gas.',
        'Temperature Increase: Favors ENDOTHERMIC direction (ΔH > 0).',
        'Catalyst: Accelerates both forward & backward rates equally; does NOT shift equilibrium position or alter Kc.',
      ],
      table: {
        headers: ['Imposed Stress', 'Direction of Shift', 'Effect on Equilibrium Constant (Kc)'],
        rows: [
          ['Increase Reactant Conc.', 'Forward (→)', 'No change'],
          ['Increase Total Pressure (Gases)', 'Towards fewer moles of gas', 'No change'],
          ['Increase Temperature (Exothermic)', 'Backward (←)', 'Kc DECREASES'],
          ['Increase Temperature (Endothermic)', 'Forward (→)', 'Kc INCREASES'],
          ['Add Catalyst', 'No shift (Equilibrium reached faster)', 'No change'],
        ]
      },
      tip: '⭐ Key Rule: ONLY TEMPERATURE changes the numerical value of Kc! Pressure and concentration do NOT change Kc.',
    },
    {
      subject: 'Chemistry',
      tag: 'tag-chem',
      title: 'Organic Chemistry: Functional Groups & IUPAC Rules',
      formula: 'Carboxylic > Aldehyde > Ketone > Alcohol > Amine > Alkene > Alkyne > Alkane',
      desc: 'Priority order of functional groups for naming polyfunctional organic molecules.',
      details: [
        'Suffixes: -oic acid (-COOH), -al (-CHO), -one (>C=O), -ol (-OH), -amine (-NH₂), -ene (C=C), -yne (C≡C).',
        'Electrophiles (Lewis acids) seek electrons (e.g. H⁺, NO₂⁺, R⁺); Nucleophiles (Lewis bases) donate electron pairs (e.g. OH⁻, NH₃, CN⁻).',
        'Markovnikov’s Rule: In asymmetrical alkene addition (HX), hydrogen adds to the carbon with MORE hydrogen atoms (rich get richer).',
      ],
      table: {
        headers: ['Priority', 'Functional Group', 'Class Name', 'IUPAC Suffix'],
        rows: [
          ['1', '-COOH', 'Carboxylic Acid', '-oic acid'],
          ['2', '-CHO', 'Aldehyde', '-al'],
          ['3', '>C=O', 'Ketone', '-one'],
          ['4', '-OH', 'Alcohol / Phenol', '-ol'],
          ['5', '-NH₂', 'Amine', '-amine'],
          ['6', 'C=C / C≡C', 'Alkene / Alkyne', '-ene / -yne'],
        ]
      },
      warning: '⚠️ IUPAC Trap: In numbering a chain with both a double and triple bond, giving the lowest set of locants is priority. If a tie exists, double bond (-ene) gets priority over triple bond (-yne).',
    },
  ],

  // ── 6. PHYSICS STUDY NOTES & TABLES ────────────────────────────
  physics: [
    {
      subject: 'Physics',
      tag: 'tag-phys',
      title: 'Projectile Motion High-Yield Formulas',
      formula: 'H = (v₀² sin²θ)/(2g)  |  T = (2v₀ sinθ)/g  |  R = (v₀² sin 2θ)/g',
      desc: '2D motion under constant downward acceleration g. Horizontal velocity v_x = v₀ cosθ is CONSTANT throughout flight.',
      details: [
        'Maximum Horizontal Range occurs at launch angle θ = 45°: R_max = v₀²/g.',
        'Equal Range occurs for complementary launch angles: θ and (90° - θ). For example, 30° and 60° produce the same range.',
        'At peak height: Vertical velocity v_y = 0, but total velocity is NOT zero (v_top = v₀ cosθ). Acceleration is always g downward.',
      ],
      table: {
        headers: ['Parameter', 'Formula', 'Angle for Maximum'],
        rows: [
          ['Maximum Height (H)', 'H = (v₀² sin²θ) / (2g)', 'θ = 90° (Vertical throw)'],
          ['Time of Flight (T)', 'T = (2v₀ sinθ) / g', 'θ = 90°'],
          ['Horizontal Range (R)', 'R = (v₀² sin 2θ) / g', 'θ = 45° (R_max = v₀²/g)'],
          ['Range at Complementary Angles', 'R(θ) = R(90° - θ)', 'E.g. θ = 15° and 75° give identical R'],
        ]
      },
      tip: '⭐ MDCAT Calculation Shortcut: R_max = 4 × H_max when launched at 45°.',
    },
  ],

  // ── 7. TOP 100 VOCABULARY ──────────────────────────────────────
  vocab: [
    { word: 'Aberration', pos: 'noun', def: 'A departure from what is normal, usual, or expected.', syn: 'Anomaly, deviation, irregularity', mnemonic: 'A bear in an Asian city is an aberration (unusual).' },
    { word: 'Acumen', pos: 'noun', def: 'The ability to make good judgments and quick decisions.', syn: 'Astuteness, shrewdness, sharpness', mnemonic: 'Accurate men possess high acumen.' },
    { word: 'Alacrity', pos: 'noun', def: 'Brisk and cheerful readiness.', syn: 'Eagerness, enthusiasm, promptness', mnemonic: 'Electricity-like quick readiness.' },
    { word: 'Benevolent', pos: 'adj', def: 'Well meaning and kindly.', syn: 'Kind-hearted, altruistic, magnanimous', mnemonic: 'Bene = Good. Wishing goodness for others.' },
    { word: 'Capricious', pos: 'adj', def: 'Given to sudden and unaccountable changes of mood or behavior.', syn: 'Fickle, erratic, impulsive', mnemonic: 'Car prices changing without rhyme or reason.' },
    { word: 'Cogent', pos: 'adj', def: 'Clear, logical, and convincing.', syn: 'Compelling, potent, persuasive', mnemonic: 'Co-agent giving convincing proof.' },
    { word: 'Debilitate', pos: 'verb', def: 'Make someone weak and infirm.', syn: 'Enfeeble, weaken, undermine', mnemonic: 'De-ability: stripping away ability.' },
    { word: 'Ephemeral', pos: 'adj', def: 'Lasting for a very short time.', syn: 'Transitory, fleeting, evanescent', mnemonic: 'Sounds like funeral: earthly life is short.' },
    { word: 'Equivocal', pos: 'adj', def: 'Open to more than one interpretation; ambiguous.', syn: 'Cryptic, vague, evasive', mnemonic: 'Equal voices on two sides; unclear.' },
    { word: 'Fastidious', pos: 'adj', def: 'Very attentive to and concerned about accuracy and detail.', syn: 'Scrupulous, meticulous, picky', mnemonic: 'Fast to feel disgust when details are wrong.' },
    { word: 'Gregarious', pos: 'adj', def: 'Fond of company; sociable.', syn: 'Convivial, friendly, outgoing', mnemonic: 'Group lover.' },
    { word: 'Innocuous', pos: 'adj', def: 'Not harmful or offensive.', syn: 'Harmless, benign, inoffensive', mnemonic: 'In-noxious: without toxicity.' },
    { word: 'Lucid', pos: 'adj', def: 'Expressed clearly; easy to understand.', syn: 'Intelligible, coherent, transparent', mnemonic: 'Lucid dream = clear vision.' },
    { word: 'Meticulous', pos: 'adj', def: 'Showing great attention to detail; very careful.', syn: 'Conscientious, precise, thorough', mnemonic: 'Medical surgeons must be meticulous.' },
    { word: 'Mitigate', pos: 'verb', def: 'Make less severe, serious, or painful.', syn: 'Alleviate, attenuate, appease', mnemonic: 'Pouring sand (mitti) on fire to calm it.' },
    { word: 'Pragmatic', pos: 'adj', def: 'Dealing with things sensibly and realistically.', syn: 'Practical, down-to-earth, rational', mnemonic: 'Pragmatic = Practical.' },
    { word: 'Ubiquitous', pos: 'adj', def: 'Present, appearing, or found everywhere.', syn: 'Omnipresent, pervasive, universal', mnemonic: 'Mosquitoes in July are ubiquitous.' },
    { word: 'Zealous', pos: 'adj', def: 'Having or showing passionate zeal.', syn: 'Fervent, ardent, enthusiastic', mnemonic: 'Full of zeal.' },
  ],

  // ── 8. PMDC EXAM STRUCTURE ─────────────────────────────────────
  syllabus: [
    { subject: 'Biology', share: '45%', mcqs: 81, desc: 'Highest weightage. Cell Biology, Biological Molecules, Enzymes, Bioenergetics, Human Physiology, Genetics & Evolution.' },
    { subject: 'Chemistry', share: '25%', mcqs: 45, desc: 'Physical Chemistry (Atomic Structure, Gases, Equilibrium, Thermochemistry), Inorganic (Periodic trends), Organic Chemistry.' },
    { subject: 'Physics', share: '20%', mcqs: 36, desc: 'Mechanics, Work-Energy, Thermodynamics, Electrostatics, Current Electricity, Electromagnetism, Modern & Nuclear Physics.' },
    { subject: 'English', share: '5%', mcqs: 9, desc: 'Vocabulary in context, Subject-Verb Agreement, Syntax & Sentence Correction, Reading Comprehension.' },
    { subject: 'Logical Reasoning', share: '5%', mcqs: 9, desc: 'Critical Thinking, Letter & Symbol Series, Syllogisms, Cause and Effect logic.' },
  ],
};
