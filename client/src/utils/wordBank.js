
export const CURATED_WORDS = [
    "ephemeral", "serendipity", "obfuscate", "resilient", "eloquent",
    "pragmatic", "ineffable", "soliloquy", "melancholy", "nostalgia",
    "sonder", "limerence", "ethereal", "petrichor", "luminescence",
    "nebulous", "epiphany", "quintessential", "surreptitious", "cacophony",
    "paradox", "ubiquitous", "magnanimous", "benevolent", "malevolent",
    "garrulous", "taciturn", "meticulous", "fastidious", "ambivalent",
    "equivocate", "mitigate", "alleviate", "exacerbate", "lucid"
];

export const getRandomWords = (count = 6) => {
    const shuffled = [...CURATED_WORDS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};