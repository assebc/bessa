// salary before taxes , max tax percentage , take off , effective tax percentage
export const IRSTable = (R: number) => [
  [870,	       0,         0,      0],
  [992,	    0.13,		  r1(R),	0.031],
  [1063,	 0.165,		  r2(R),	0.055],
  [1116,	 0.175,		    128,	 0.06],
  [1214,	  0.25,		 211.70,	0.076],
  [1837,	  0.26,		 223.84,	0.138],
  [2074,	 0.325,		 343.25,	0.159],
  [2301,	 0.355,		 405.47,	0.179],
  [3398,   0.435,		 589.55,	0.262],
  [5833,    0.45,		 640.52,	 0.34],
  [18332,  0.505,		 961.34,	0.453],
  [18332,	  0.53,		1419.64,	    1]
];

const r1 = (R: number) => 0.13	*	2.60	* (1282.29	- R);
const r2 = (R: number) => 0.165	*	1.35	* (1589.90	- R);

export const IRSJovemTaxes = {
  100: [1],
  75: [2, 3, 4],
  50: [5, 6, 7],
  25: [8, 9, 10],
}

export const IRSJovem = Array.from({ length: 8 }, (_, i) => i + 1);