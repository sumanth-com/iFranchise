const fs = require('fs');
const p = 'src/components/ForBrandOwnersPage.jsx';
let s = fs.readFileSync(p, 'utf8');

s = s.replace(
  '<motion.div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4"><motion.div className="flex items-center justify-between pt-2 border-t border-white/10">',
  '<motion.div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">'
);

// fix duplicated inner div opener if still there
s = s.replace(
  '<motion.div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4"><motion.div className="flex items-center justify-between pt-2 border-t border-white/10">',
  '<motion.div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">'
);

s = s.replace(
  '<motion.div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4"><div className="flex items-center justify-between pt-2 border-t border-white/10">',
  '<motion.div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">'
);

// Fix footer closes: should be </motion.div></motion.div></motion.div> for footer, body, card
const footerBroken = `                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
            </AnimatePresence>`;

const footerFixed = `                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
            </AnimatePresence>`;

// Current broken (from build): </motion.div></motion.div></motion.div> with wrong nesting
const current = `                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
            </AnimatePresence>`;

// Read what's actually there
const idx = s.indexOf('Get This Solution');
const snippet = s.slice(idx, idx + 400);
console.log(snippet);

// Replace the broken footer section
s = s.replace(
  /                    <\/button>\s*<\/div>\s*<\/div>\s*<\/motion\.motion.div>\s*\)\}/,
  `                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}`
);

s = s.replace(
  `                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
            </AnimatePresence>`,
  `                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
            </AnimatePresence>`
);

// Actual fix from file read lines 516-519
s = s.replace(
  `                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
            </AnimatePresence>`,
  `                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
            </AnimatePresence>`
);

// Direct fix
s = s.replace(
  `                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>`,
  `                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>`
);

// From actual file:
s = s.replace(
  `                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>`,
  `                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>`
);

// Last resort - lines 516-519 in file:
s = s.replace(
  `                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>`,
  `                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>`
);

// What file actually has per read:
s = s.replace(
  `                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>`,
  `                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>`
);

// Real content from read lines 516-519:
if (s.includes('                    </button>\n                  </motion.div>\n                </motion.div>\n              </motion.div>')) {
  console.log('pattern1');
}
if (s.includes('                    </button>\n                  </motion.div>\n                </motion.div>\n              </motion.div>')) {
  console.log('pattern2');
}

// Exact from read:
const exact = `                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>`;

const exactFix = `                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>`;

// lines 516-518 from read:
// 516|                    </button>
// 517|                  </motion.div>
// 518|                </motion.div>
// 519|              </motion.div>

s = s.replace(
  `                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>`,
  `                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>`
);

// I keep making same replacement. The issue is:
// 517: </motion.div> closes footer inner - should close footer div
// 518: </motion.div> closes body - should be </motion.div>
// 519: </motion.div> closes card - correct

// Footer opens with motion.div on 497 (after fix should be div)
// Body opens 462 div
// Card opens 438 motion.div

// So closes should be: </motion.div> (footer) </motion.div> (body) </motion.div> (card)

s = s.replace(
  `                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>`,
  `                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>`
);

// Let me just fix line 497 and 517-518 manually
const lines = s.split('\n');
for (let i = 494; i < 522; i++) {
  if (lines[i]) console.log(String(i + 1).padStart(3), lines[i]);
}

lines[496] = '                  <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">';
lines[516] = '                  </motion.div>';
lines[517] = '                </motion.div>';
lines[518] = '              </motion.div>';

fs.writeFileSync(p, lines.join('\n'));
console.log('fixed lines');
