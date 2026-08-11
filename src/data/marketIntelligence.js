// AUTO-GENERATED from the '108' sheet of 'Market Intelligence.xlsx'.
// This is the single source of local data for the prototype.
// Shape mirrors the intended Supabase tables, so swapping this module for an
// API/Supabase client requires no component changes.
//
// Rules honoured during normalization:
//   * nothing is invented - missing sheet values are `null` / empty arrays
//   * original raw strings are kept alongside parsed values so the UI can show
//     source-vs-calculated conflicts instead of silently overwriting them
//   * Gates 2-4 are unpopulated in the sheet and stay `not_evaluated`

export const datasetMeta = {
  "sourceWorkbook": "Market Intelligence.xlsx",
  "sourceSheet": "108",
  "companyCount": 20,
  "note": "Normalized from the 108 research sheet only. Fields absent in the sheet are null and are surfaced in the UI as not available rather than zero."
};

export const companies = [
  {
    "id": "namma-yatri",
    "slNo": 1,
    "name": "Namma Yatri",
    "foundedYear": 2022,
    "founders": [
      "Vimal Kumar",
      "Shanmugavel Mani Subbiah (Shan M S)",
      "Magizhan Selvan",
      "Sheetal Lalwani"
    ],
    "founderNote": null,
    "location": "Bengaluru, Karnataka, India",
    "funding": {
      "type": "Pre-Series A Extension",
      "amount": "₹39.75 crore",
      "date": "March 2026",
      "amountRaw": "₹39.75 crore, March 2026",
      "investors": [
        "Blume Ventures",
        "Antler",
        "Google",
        "Vimal Kumar (Juspay founder)",
        "Navin Dalmia",
        "Plutus Investment Trust"
      ]
    },
    "employees": {
      "reported": 218,
      "range": {
        "min": 51,
        "max": 200,
        "label": "51-200 employees"
      },
      "raw": "51-200 employees, 218"
    },
    "team": [
      {
        "id": "namma-yatri-team-1",
        "function": "Engineering",
        "count": 54
      },
      {
        "id": "namma-yatri-team-2",
        "function": "Operations",
        "count": 43
      },
      {
        "id": "namma-yatri-team-3",
        "function": "Customer Success and Support",
        "count": 18
      },
      {
        "id": "namma-yatri-team-4",
        "function": "Marketing",
        "count": 15
      },
      {
        "id": "namma-yatri-team-5",
        "function": "Business Development",
        "count": 13
      }
    ],
    "engDensity": {
      "raw": "37.8%)",
      "value": 0.37799999999999995,
      "unitAmbiguous": true
    },
    "taPercent": {
      "raw": "0.0",
      "value": 0.0,
      "unitAmbiguous": false
    },
    "employeeGrowth": null,
    "hiring": {
      "jobs": [
        {
          "id": "namma-yatri-job-1",
          "index": 1,
          "roles": "Finance Lead",
          "location": null,
          "source": "Linked In",
          "recency": "1 week ago",
          "applicants": "100+",
          "status": "still accepting",
          "jdDuplication": null,
          "reposted": null,
          "hiringManager": null,
          "panel": null,
          "jdAnalysis": null
        },
        {
          "id": "namma-yatri-job-2",
          "index": 2,
          "roles": "Finance Lead + 6 more jobs ( 1 Kolkata )",
          "location": null,
          "source": "FoundIt",
          "recency": "10 days ago , 1 mo ago , 2 mo ago",
          "applicants": "10,20,30, 50 ,300 applicants",
          "status": null,
          "jdDuplication": null,
          "reposted": null,
          "hiringManager": null,
          "panel": null,
          "jdAnalysis": null
        },
        {
          "id": "namma-yatri-job-3",
          "index": 3,
          "roles": "3 jobs",
          "location": null,
          "source": "NextLeap",
          "recency": "8 mo ago",
          "applicants": null,
          "status": null,
          "jdDuplication": null,
          "reposted": null,
          "hiringManager": null,
          "panel": null,
          "jdAnalysis": null
        },
        {
          "id": "namma-yatri-job-4",
          "index": 4,
          "roles": "Director - govt business & partneship (Delhi - remote )",
          "location": null,
          "source": "iimjobs",
          "recency": null,
          "applicants": null,
          "status": null,
          "jdDuplication": null,
          "reposted": null,
          "hiringManager": null,
          "panel": null,
          "jdAnalysis": null
        },
        {
          "id": "namma-yatri-job-5",
          "index": 5,
          "roles": "Zonal Mngr, Finance Lead (3) , Mngr govt Biz & Prtnship",
          "location": null,
          "source": "BeBee",
          "recency": "2 days ago , 1 w ago , 1 mo ago",
          "applicants": null,
          "status": null,
          "jdDuplication": null,
          "reposted": null,
          "hiringManager": null,
          "panel": null,
          "jdAnalysis": null
        }
      ],
      "notes": [],
      "columnCounts": {
        "roles": 5,
        "sources": 5,
        "recency": 4,
        "applicants": 2,
        "status": 1
      },
      "externalPartners": [],
      "hiringBadge": {
        "raw": null
      },
      "urgency": null,
      "jdDuplication": null,
      "reposts": null,
      "hiringManager": null,
      "panel": null,
      "jdAnalysis": null,
      "teamAnalysis": null,
      "applicantCount": null,
      "hiringPain": null
    },
    "hr": {
      "count": 4,
      "people": [
        {
          "id": "namma-yatri-person-1",
          "name": "Divya k",
          "function": null,
          "linkedin": null
        },
        {
          "id": "namma-yatri-person-2",
          "name": "Prerna Bhagat",
          "function": null,
          "linkedin": null
        },
        {
          "id": "namma-yatri-person-3",
          "name": "Piyush Pavase",
          "function": null,
          "linkedin": null
        }
      ],
      "sourceNote": "HR- 4\n1. Divya k\n2. Prerna Bhagat\n3. Piyush Pavase\n\nTA- 0",
      "statedNone": false
    },
    "ta": {
      "count": 0,
      "people": [],
      "sourceNote": "HR- 4\n1. Divya k\n2. Prerna Bhagat\n3. Piyush Pavase\n\nTA- 0",
      "statedNone": false
    },
    "gates": {
      "gate0": {
        "raw": "pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate1": {
        "raw": "Pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate2": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate3": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate4": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      }
    },
    "business": {
      "product": null,
      "growth": null,
      "revenue": null,
      "pmf": null,
      "publicPerception": null,
      "customers": null
    },
    "brief": null,
    "decisionMakers": [],
    "outreach": {
      "status": null,
      "message": null,
      "channel": null,
      "link": null
    },
    "openRoles": {
      "atLeast": 7,
      "exact": false
    },
    "evidence": [
      {
        "id": "namma-yatri-ev-1",
        "category": "Hiring",
        "observation": "Finance Lead — Applicants: 100+; Listing: still accepting",
        "source": "Linked In",
        "sourceUrl": null,
        "recency": "1 week ago",
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "namma-yatri-ev-2",
        "category": "Hiring",
        "observation": "Finance Lead + 6 more jobs ( 1 Kolkata ) — Applicants: 10,20,30, 50 ,300 applicants",
        "source": "FoundIt",
        "sourceUrl": null,
        "recency": "10 days ago , 1 mo ago , 2 mo ago",
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "namma-yatri-ev-3",
        "category": "Hiring",
        "observation": "3 jobs",
        "source": "NextLeap",
        "sourceUrl": null,
        "recency": "8 mo ago",
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "namma-yatri-ev-4",
        "category": "Hiring",
        "observation": "Director - govt business & partneship (Delhi - remote )",
        "source": "iimjobs",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "namma-yatri-ev-5",
        "category": "Hiring",
        "observation": "Zonal Mngr, Finance Lead (3) , Mngr govt Biz & Prtnship",
        "source": "BeBee",
        "sourceUrl": null,
        "recency": "2 days ago , 1 w ago , 1 mo ago",
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "namma-yatri-ev-6",
        "category": "Team",
        "observation": "Team composition recorded: Engineering 54, Operations 43, Customer Success and Support 18, Marketing 15, Business Development 13",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Needs verification"
      },
      {
        "id": "namma-yatri-ev-7",
        "category": "Team",
        "observation": "HR / TA coverage: 4 HR, 0 TA · Divya k, Prerna Bhagat, Piyush Pavase",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "namma-yatri-ev-8",
        "category": "Funding",
        "observation": "Pre-Series A Extension: ₹39.75 crore",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "namma-yatri-ev-9",
        "category": "Qualification",
        "observation": "Gate 0 recorded as “pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "namma-yatri-ev-10",
        "category": "Qualification",
        "observation": "Gate 1 recorded as “Pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      }
    ]
  },
  {
    "id": "newtrace",
    "slNo": 2,
    "name": "Newtrace",
    "foundedYear": 2021,
    "founders": [
      "Prasanta Sarkar",
      "Rochan Sinha"
    ],
    "founderNote": null,
    "location": "Bengaluru, Karnataka, India",
    "funding": {
      "type": "Pre-Series A",
      "amount": "$6.3 million (₹56.9 crore)",
      "date": "10 Mar 2026",
      "amountRaw": "$6.3 million (₹56.9 crore) – 10 Mar 2026",
      "investors": [
        "HDFC Bank",
        "Mitsui Sumitomo Insurance Venture Capital (MSIVC)",
        "Peak XV Partners' Surge",
        "Aavishkaar Capital",
        "Speciale Invest",
        "Micelio Technology Fund",
        "Manish Prataprai Gandhi",
        "Renu Manish Gandhi"
      ]
    },
    "employees": {
      "reported": 46,
      "range": {
        "min": 11,
        "max": 50,
        "label": "11-50 employees"
      },
      "raw": "11-50 employees, 46"
    },
    "team": [
      {
        "id": "newtrace-team-1",
        "function": "Engineering",
        "count": 17
      },
      {
        "id": "newtrace-team-2",
        "function": "Operations",
        "count": 16
      },
      {
        "id": "newtrace-team-3",
        "function": "Business Development",
        "count": 6
      },
      {
        "id": "newtrace-team-4",
        "function": "Customer Success and Support",
        "count": 4
      },
      {
        "id": "newtrace-team-5",
        "function": "Finance",
        "count": 3
      }
    ],
    "engDensity": {
      "raw": "0.37",
      "value": 0.37,
      "unitAmbiguous": false
    },
    "taPercent": {
      "raw": "2.17%.",
      "value": 0.0217,
      "unitAmbiguous": true
    },
    "employeeGrowth": null,
    "hiring": {
      "jobs": [
        {
          "id": "newtrace-job-1",
          "index": 1,
          "roles": "Sr Manager Electroplating , Store Incharge",
          "location": null,
          "source": "Linked in",
          "recency": "2 weeks ago , 3 weeks ago",
          "applicants": "79 , 100 +",
          "status": "still accepting",
          "jdDuplication": null,
          "reposted": null,
          "hiringManager": null,
          "panel": null,
          "jdAnalysis": null
        },
        {
          "id": "newtrace-job-2",
          "index": 2,
          "roles": "7 jobs",
          "location": null,
          "source": "Indeed",
          "recency": null,
          "applicants": null,
          "status": "still accepting",
          "jdDuplication": null,
          "reposted": null,
          "hiringManager": null,
          "panel": null,
          "jdAnalysis": null
        },
        {
          "id": "newtrace-job-3",
          "index": 3,
          "roles": "7 jobs",
          "location": null,
          "source": "Reczee~ career page",
          "recency": "2 w , 3 w , 5,7,8,9,11 mo ago",
          "applicants": null,
          "status": "still accepting",
          "jdDuplication": null,
          "reposted": null,
          "hiringManager": null,
          "panel": null,
          "jdAnalysis": null
        },
        {
          "id": "newtrace-job-4",
          "index": 4,
          "roles": "7 jobs",
          "location": null,
          "source": "surge",
          "recency": "posted 30+ days ago",
          "applicants": null,
          "status": null,
          "jdDuplication": null,
          "reposted": null,
          "hiringManager": null,
          "panel": null,
          "jdAnalysis": null
        },
        {
          "id": "newtrace-job-5",
          "index": 5,
          "roles": "9 jobs , 1 dup repost",
          "location": null,
          "source": "Naukri",
          "recency": "3 weeks +",
          "applicants": "23,35,50+,100+",
          "status": "still accepting",
          "jdDuplication": null,
          "reposted": null,
          "hiringManager": null,
          "panel": null,
          "jdAnalysis": null
        },
        {
          "id": "newtrace-job-6",
          "index": 6,
          "roles": "Plant Operator ,",
          "location": null,
          "source": "BeBee",
          "recency": "1 week ago",
          "applicants": null,
          "status": "still accepting",
          "jdDuplication": null,
          "reposted": null,
          "hiringManager": null,
          "panel": null,
          "jdAnalysis": null
        },
        {
          "id": "newtrace-job-7",
          "index": 7,
          "roles": "Store supervisor",
          "location": null,
          "source": "Jooble",
          "recency": "24 days ago",
          "applicants": null,
          "status": null,
          "jdDuplication": null,
          "reposted": null,
          "hiringManager": null,
          "panel": null,
          "jdAnalysis": null
        },
        {
          "id": "newtrace-job-8",
          "index": 8,
          "roles": "Plant Operator",
          "location": null,
          "source": "Kitjob",
          "recency": "13 days ago",
          "applicants": null,
          "status": null,
          "jdDuplication": null,
          "reposted": null,
          "hiringManager": null,
          "panel": null,
          "jdAnalysis": null
        }
      ],
      "notes": [],
      "columnCounts": {
        "roles": 8,
        "sources": 8,
        "recency": 7,
        "applicants": 2,
        "status": 5
      },
      "externalPartners": [
        "Zoho Recruit"
      ],
      "hiringBadge": {
        "raw": "yes \n\nTresa Jose- TA cum HR"
      },
      "urgency": null,
      "jdDuplication": null,
      "reposts": null,
      "hiringManager": null,
      "panel": null,
      "jdAnalysis": null,
      "teamAnalysis": null,
      "applicantCount": null,
      "hiringPain": null
    },
    "hr": {
      "count": null,
      "people": [
        {
          "id": "newtrace-person-1",
          "name": "Tresa Jose",
          "function": "was a TA, now she is Senior HR, with a Hiring badge",
          "linkedin": null
        },
        {
          "id": "newtrace-person-2",
          "name": "Hiranyamayee Sahu, HR intern",
          "function": null,
          "linkedin": null
        }
      ],
      "sourceNote": "1. Tresa Jose - was a TA, now she is Senior HR, with a Hiring badge \n2. Hiranyamayee Sahu, HR intern",
      "statedNone": false
    },
    "ta": {
      "count": null,
      "people": [
        {
          "id": "newtrace-person-1-ta",
          "name": "Tresa Jose",
          "function": "was a TA, now she is Senior HR, with a Hiring badge",
          "linkedin": null
        }
      ],
      "sourceNote": "1. Tresa Jose - was a TA, now she is Senior HR, with a Hiring badge \n2. Hiranyamayee Sahu, HR intern",
      "statedNone": false
    },
    "gates": {
      "gate0": {
        "raw": "pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate1": {
        "raw": "Pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate2": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate3": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate4": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      }
    },
    "business": {
      "product": null,
      "growth": null,
      "revenue": null,
      "pmf": null,
      "publicPerception": null,
      "customers": null
    },
    "brief": null,
    "decisionMakers": [],
    "outreach": {
      "status": null,
      "message": null,
      "channel": null,
      "link": null
    },
    "openRoles": {
      "atLeast": 10,
      "exact": false
    },
    "evidence": [
      {
        "id": "newtrace-ev-1",
        "category": "Hiring",
        "observation": "Sr Manager Electroplating , Store Incharge — Applicants: 79 , 100 +; Listing: still accepting",
        "source": "Linked in",
        "sourceUrl": null,
        "recency": "2 weeks ago , 3 weeks ago",
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "newtrace-ev-2",
        "category": "Hiring",
        "observation": "7 jobs — Listing: still accepting",
        "source": "Indeed",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "newtrace-ev-3",
        "category": "Hiring",
        "observation": "7 jobs — Listing: still accepting",
        "source": "Reczee~ career page",
        "sourceUrl": null,
        "recency": "2 w , 3 w , 5,7,8,9,11 mo ago",
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "newtrace-ev-4",
        "category": "Hiring",
        "observation": "7 jobs",
        "source": "surge",
        "sourceUrl": null,
        "recency": "posted 30+ days ago",
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "newtrace-ev-5",
        "category": "Hiring",
        "observation": "9 jobs , 1 dup repost — Applicants: 23,35,50+,100+; Listing: still accepting",
        "source": "Naukri",
        "sourceUrl": null,
        "recency": "3 weeks +",
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "newtrace-ev-6",
        "category": "Hiring",
        "observation": "Plant Operator , — Listing: still accepting",
        "source": "BeBee",
        "sourceUrl": null,
        "recency": "1 week ago",
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "newtrace-ev-7",
        "category": "Hiring",
        "observation": "Store supervisor",
        "source": "Jooble",
        "sourceUrl": null,
        "recency": "24 days ago",
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "newtrace-ev-8",
        "category": "Hiring",
        "observation": "Plant Operator",
        "source": "Kitjob",
        "sourceUrl": null,
        "recency": "13 days ago",
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "newtrace-ev-9",
        "category": "Team",
        "observation": "Team composition recorded: Engineering 17, Operations 16, Business Development 6, Customer Success and Support 4, Finance 3",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Needs verification"
      },
      {
        "id": "newtrace-ev-10",
        "category": "Team",
        "observation": "HR / TA coverage: Tresa Jose (was a TA, now she is Senior HR, with a Hiring badge), Hiranyamayee Sahu, HR intern",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "newtrace-ev-11",
        "category": "Hiring",
        "observation": "LinkedIn hiring badge: yes \n\nTresa Jose- TA cum HR",
        "source": "LinkedIn",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "newtrace-ev-12",
        "category": "Hiring",
        "observation": "External talent partner in use: Zoho Recruit",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "newtrace-ev-13",
        "category": "Funding",
        "observation": "Pre-Series A: $6.3 million (₹56.9 crore)",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "newtrace-ev-14",
        "category": "Qualification",
        "observation": "Gate 0 recorded as “pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "newtrace-ev-15",
        "category": "Qualification",
        "observation": "Gate 1 recorded as “Pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      }
    ]
  },
  {
    "id": "enerzi",
    "slNo": 4,
    "name": "Enerzi",
    "foundedYear": 2007,
    "founders": [
      "Prakash Mugali",
      "Kirankumar Hittalmani",
      "Krupashankara M.S."
    ],
    "founderNote": null,
    "location": "Belagavi (Belgaum), Karnataka, India",
    "funding": {
      "type": "Seed",
      "amount": "₹16.5 crore (~$2 million)",
      "date": "26 Nov 2025",
      "amountRaw": "₹16.5 crore (~$2 million) – 26 Nov 2025",
      "investors": [
        "Capital-A",
        "8x Ventures",
        "Participating angel investors"
      ]
    },
    "employees": {
      "reported": 50,
      "range": {
        "min": 51,
        "max": 200,
        "label": "51-200 employees"
      },
      "raw": "51-200 employees, 50"
    },
    "team": [
      {
        "id": "enerzi-team-1",
        "function": "Engineering",
        "count": 24
      },
      {
        "id": "enerzi-team-2",
        "function": "Business Development",
        "count": 6
      },
      {
        "id": "enerzi-team-3",
        "function": "Operations",
        "count": 5
      },
      {
        "id": "enerzi-team-4",
        "function": "Marketing",
        "count": 4
      },
      {
        "id": "enerzi-team-5",
        "function": "Research",
        "count": 4
      }
    ],
    "engDensity": {
      "raw": "0.558",
      "value": 0.558,
      "unitAmbiguous": false
    },
    "taPercent": {
      "raw": "0.0",
      "value": 0.0,
      "unitAmbiguous": false
    },
    "employeeGrowth": null,
    "hiring": {
      "jobs": [
        {
          "id": "enerzi-job-1",
          "index": 1,
          "roles": "5 jobs (all engineers jobs)",
          "location": null,
          "source": "Career Page",
          "recency": null,
          "applicants": null,
          "status": null,
          "jdDuplication": null,
          "reposted": null,
          "hiringManager": null,
          "panel": null,
          "jdAnalysis": null
        }
      ],
      "notes": [],
      "columnCounts": {
        "roles": 1,
        "sources": 1,
        "recency": 0,
        "applicants": 0,
        "status": 0
      },
      "externalPartners": [],
      "hiringBadge": {
        "raw": "No"
      },
      "urgency": null,
      "jdDuplication": null,
      "reposts": null,
      "hiringManager": null,
      "panel": null,
      "jdAnalysis": null,
      "teamAnalysis": null,
      "applicantCount": null,
      "hiringPain": null
    },
    "hr": {
      "count": 1,
      "people": [
        {
          "id": "enerzi-person-1",
          "name": "Roopa Devaprasad",
          "function": null,
          "linkedin": null
        }
      ],
      "sourceNote": "HR -1 \n1. Roopa Devaprasad",
      "statedNone": false
    },
    "ta": {
      "count": null,
      "people": [],
      "sourceNote": "HR -1 \n1. Roopa Devaprasad",
      "statedNone": false
    },
    "gates": {
      "gate0": {
        "raw": "pass, Location Needs to check once",
        "result": "pass",
        "reason": "Location Needs to check once",
        "notes": null,
        "evidence": null
      },
      "gate1": {
        "raw": "Pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate2": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate3": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate4": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      }
    },
    "business": {
      "product": null,
      "growth": null,
      "revenue": null,
      "pmf": null,
      "publicPerception": null,
      "customers": null
    },
    "brief": null,
    "decisionMakers": [],
    "outreach": {
      "status": null,
      "message": null,
      "channel": null,
      "link": null
    },
    "openRoles": {
      "atLeast": 5,
      "exact": false
    },
    "evidence": [
      {
        "id": "enerzi-ev-1",
        "category": "Hiring",
        "observation": "5 jobs (all engineers jobs)",
        "source": "Career Page",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "enerzi-ev-2",
        "category": "Team",
        "observation": "Team composition recorded: Engineering 24, Business Development 6, Operations 5, Marketing 4, Research 4",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Needs verification"
      },
      {
        "id": "enerzi-ev-3",
        "category": "Team",
        "observation": "HR / TA coverage: 1 HR · Roopa Devaprasad",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "enerzi-ev-4",
        "category": "Hiring",
        "observation": "LinkedIn hiring badge: No",
        "source": "LinkedIn",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "enerzi-ev-5",
        "category": "Funding",
        "observation": "Seed: ₹16.5 crore (~$2 million)",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "enerzi-ev-6",
        "category": "Qualification",
        "observation": "Gate 0 recorded as “pass, Location Needs to check once”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "enerzi-ev-7",
        "category": "Qualification",
        "observation": "Gate 1 recorded as “Pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      }
    ]
  },
  {
    "id": "spacefields",
    "slNo": 5,
    "name": "SpaceFields",
    "foundedYear": 2021,
    "founders": [
      "Apurwa Masook",
      "Rounak Agrawal",
      "Sudarshan Samal"
    ],
    "founderNote": null,
    "location": "Bengaluru, Karnataka, India",
    "funding": {
      "type": "Pre-Series A",
      "amount": "$5 million (₹42 crore)",
      "date": "19 Sep 2025",
      "amountRaw": "$5 million (₹42 crore) – 19 Sep 2025",
      "investors": [
        "Globaz Technologies Pvt. Ltd.",
        "Rockstud Capital",
        "Venture Catalysts",
        "Rainmatter (by Zerodha)",
        "Burla Angel Network",
        "Faad Capital",
        "SIDBI",
        "O2 Angels",
        "MeitY Startup Hub"
      ]
    },
    "employees": {
      "reported": 46,
      "range": {
        "min": 11,
        "max": 50,
        "label": "11-50 employees"
      },
      "raw": "11-50 employees, 46"
    },
    "team": [
      {
        "id": "spacefields-team-1",
        "function": "Engineering",
        "count": 24
      },
      {
        "id": "spacefields-team-2",
        "function": "Business Development",
        "count": 9
      },
      {
        "id": "spacefields-team-3",
        "function": "Entrepreneurship",
        "count": 8
      },
      {
        "id": "spacefields-team-4",
        "function": "Operations",
        "count": 6
      },
      {
        "id": "spacefields-team-5",
        "function": "Information Technology",
        "count": 2
      }
    ],
    "engDensity": {
      "raw": "0.49",
      "value": 0.49,
      "unitAmbiguous": false
    },
    "taPercent": {
      "raw": "0.0",
      "value": 0.0,
      "unitAmbiguous": false
    },
    "employeeGrowth": null,
    "hiring": {
      "jobs": [
        {
          "id": "spacefields-job-1",
          "index": 1,
          "roles": "Facility Manager",
          "location": null,
          "source": "Placement India",
          "recency": null,
          "applicants": null,
          "status": null,
          "jdDuplication": null,
          "reposted": null,
          "hiringManager": null,
          "panel": null,
          "jdAnalysis": null
        }
      ],
      "notes": [],
      "columnCounts": {
        "roles": 1,
        "sources": 1,
        "recency": 0,
        "applicants": 0,
        "status": 0
      },
      "externalPartners": [],
      "hiringBadge": {
        "raw": "NO"
      },
      "urgency": null,
      "jdDuplication": null,
      "reposts": null,
      "hiringManager": null,
      "panel": null,
      "jdAnalysis": null,
      "teamAnalysis": null,
      "applicantCount": null,
      "hiringPain": null
    },
    "hr": {
      "count": 1,
      "people": [
        {
          "id": "spacefields-person-1",
          "name": "Shabna Shanavas",
          "function": "doing Hiring work also",
          "linkedin": null
        }
      ],
      "sourceNote": "HR -1\n1.Shabna Shanavas(doing Hiring work also)",
      "statedNone": false
    },
    "ta": {
      "count": null,
      "people": [],
      "sourceNote": "HR -1\n1.Shabna Shanavas(doing Hiring work also)",
      "statedNone": false
    },
    "gates": {
      "gate0": {
        "raw": "pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate1": {
        "raw": "Fail, Jobs",
        "result": "fail",
        "reason": "Jobs",
        "notes": null,
        "evidence": null
      },
      "gate2": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate3": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate4": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      }
    },
    "business": {
      "product": null,
      "growth": null,
      "revenue": null,
      "pmf": null,
      "publicPerception": null,
      "customers": null
    },
    "brief": null,
    "decisionMakers": [],
    "outreach": {
      "status": null,
      "message": null,
      "channel": null,
      "link": null
    },
    "openRoles": {
      "atLeast": 1,
      "exact": true
    },
    "evidence": [
      {
        "id": "spacefields-ev-1",
        "category": "Hiring",
        "observation": "Facility Manager",
        "source": "Placement India",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "spacefields-ev-2",
        "category": "Team",
        "observation": "Team composition recorded: Engineering 24, Business Development 9, Entrepreneurship 8, Operations 6, Information Technology 2",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Needs verification"
      },
      {
        "id": "spacefields-ev-3",
        "category": "Team",
        "observation": "HR / TA coverage: 1 HR · Shabna Shanavas (doing Hiring work also)",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "spacefields-ev-4",
        "category": "Hiring",
        "observation": "LinkedIn hiring badge: NO",
        "source": "LinkedIn",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "spacefields-ev-5",
        "category": "Funding",
        "observation": "Pre-Series A: $5 million (₹42 crore)",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "spacefields-ev-6",
        "category": "Qualification",
        "observation": "Gate 0 recorded as “pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "spacefields-ev-7",
        "category": "Qualification",
        "observation": "Gate 1 recorded as “Fail, Jobs”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      }
    ]
  },
  {
    "id": "onfinance-ai",
    "slNo": 6,
    "name": "OnFinance AI",
    "foundedYear": 2023,
    "founders": [
      "Anuj Srivastava",
      "Priyesh Srivastava"
    ],
    "founderNote": null,
    "location": "Bengaluru, Karnataka, India",
    "funding": {
      "type": "Pre-Series A",
      "amount": "$4.2 million (Total: ~$5.25 million)",
      "date": "22–24 Sep 2025",
      "amountRaw": "$4.2 million (Total: ~$5.25 million) – 22–24 Sep 2025",
      "investors": [
        "Peak XV Partners' Surge",
        "Groww Founders' Fund",
        "MarsShot VC",
        "Climber Capital",
        "Shyamal Hitesh Anadkat",
        "Indian Angel Network (IAN)",
        "Silverneedle Ventures (SNV)",
        "Kunal Shah (CRED)"
      ]
    },
    "employees": {
      "reported": 46,
      "range": {
        "min": 11,
        "max": 50,
        "label": "11-50 employees"
      },
      "raw": "11-50 employees, 46"
    },
    "team": [
      {
        "id": "onfinance-ai-team-1",
        "function": "Engineering",
        "count": 23
      },
      {
        "id": "onfinance-ai-team-2",
        "function": "Business Development",
        "count": 13
      },
      {
        "id": "onfinance-ai-team-3",
        "function": "Education",
        "count": 6
      },
      {
        "id": "onfinance-ai-team-4",
        "function": "Information Technology",
        "count": 4
      },
      {
        "id": "onfinance-ai-team-5",
        "function": "Operations",
        "count": 3
      }
    ],
    "engDensity": {
      "raw": "0.469",
      "value": 0.469,
      "unitAmbiguous": false
    },
    "taPercent": {
      "raw": "0.0",
      "value": 0.0,
      "unitAmbiguous": false
    },
    "employeeGrowth": null,
    "hiring": {
      "jobs": [
        {
          "id": "onfinance-ai-job-1",
          "index": 1,
          "roles": "Founding Ai engineer",
          "location": null,
          "source": "IIT jobs",
          "recency": null,
          "applicants": null,
          "status": null,
          "jdDuplication": null,
          "reposted": null,
          "hiringManager": null,
          "panel": null,
          "jdAnalysis": null
        }
      ],
      "notes": [],
      "columnCounts": {
        "roles": 1,
        "sources": 1,
        "recency": 0,
        "applicants": 0,
        "status": 0
      },
      "externalPartners": [],
      "hiringBadge": {
        "raw": "No"
      },
      "urgency": null,
      "jdDuplication": null,
      "reposts": null,
      "hiringManager": null,
      "panel": null,
      "jdAnalysis": null,
      "teamAnalysis": null,
      "applicantCount": null,
      "hiringPain": null
    },
    "hr": {
      "count": 1,
      "people": [
        {
          "id": "onfinance-ai-person-1",
          "name": "Ananya Sharma",
          "function": "HR Cum TA(handing both works",
          "linkedin": null
        }
      ],
      "sourceNote": "HR-1\n1. Ananya Sharma(HR Cum TA(handing both works) )",
      "statedNone": false
    },
    "ta": {
      "count": null,
      "people": [
        {
          "id": "onfinance-ai-person-1-ta",
          "name": "Ananya Sharma",
          "function": "HR Cum TA(handing both works",
          "linkedin": null
        }
      ],
      "sourceNote": "HR-1\n1. Ananya Sharma(HR Cum TA(handing both works) )",
      "statedNone": false
    },
    "gates": {
      "gate0": {
        "raw": "pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate1": {
        "raw": "Fail, Jobs",
        "result": "fail",
        "reason": "Jobs",
        "notes": null,
        "evidence": null
      },
      "gate2": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate3": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate4": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      }
    },
    "business": {
      "product": null,
      "growth": null,
      "revenue": null,
      "pmf": null,
      "publicPerception": null,
      "customers": null
    },
    "brief": null,
    "decisionMakers": [],
    "outreach": {
      "status": null,
      "message": null,
      "channel": null,
      "link": null
    },
    "openRoles": {
      "atLeast": 1,
      "exact": true
    },
    "evidence": [
      {
        "id": "onfinance-ai-ev-1",
        "category": "Hiring",
        "observation": "Founding Ai engineer",
        "source": "IIT jobs",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "onfinance-ai-ev-2",
        "category": "Team",
        "observation": "Team composition recorded: Engineering 23, Business Development 13, Education 6, Information Technology 4, Operations 3",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Needs verification"
      },
      {
        "id": "onfinance-ai-ev-3",
        "category": "Team",
        "observation": "HR / TA coverage: 1 HR · Ananya Sharma (HR Cum TA(handing both works)",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "onfinance-ai-ev-4",
        "category": "Hiring",
        "observation": "LinkedIn hiring badge: No",
        "source": "LinkedIn",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "onfinance-ai-ev-5",
        "category": "Funding",
        "observation": "Pre-Series A: $4.2 million (Total: ~$5.25 million)",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "onfinance-ai-ev-6",
        "category": "Qualification",
        "observation": "Gate 0 recorded as “pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "onfinance-ai-ev-7",
        "category": "Qualification",
        "observation": "Gate 1 recorded as “Fail, Jobs”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      }
    ]
  },
  {
    "id": "samaaro",
    "slNo": 8,
    "name": "Samaaro",
    "foundedYear": 2020,
    "founders": [
      "Purnank Prakash",
      "Mayank Banka",
      "Jeevan Choudhary"
    ],
    "founderNote": null,
    "location": "Bengaluru, Karnataka, India",
    "funding": {
      "type": "Pre-Series A",
      "amount": "$500,000 (Total: $1.45 million)",
      "date": "25 Sep 2025",
      "amountRaw": "$500,000 (Total: $1.45 million) – 25 Sep 2025",
      "investors": [
        "Inflection Point Ventures (IPV)",
        "SucSEED Indovation Fund",
        "Silverneedle Ventures",
        "LetsVenture",
        "The Chennai Angels (TCA)",
        "Ankit Mehrotra",
        "Khalid Qazi",
        "Sagar Narola",
        "Suryansh Jalan",
        "Gautam Kumar"
      ]
    },
    "employees": {
      "reported": 33,
      "range": {
        "min": 11,
        "max": 50,
        "label": "11-50 employees"
      },
      "raw": "11-50 employees, 33"
    },
    "team": [
      {
        "id": "samaaro-team-1",
        "function": "Engineering",
        "count": 10
      },
      {
        "id": "samaaro-team-2",
        "function": "Business Development",
        "count": 6
      },
      {
        "id": "samaaro-team-3",
        "function": "Marketing",
        "count": 4
      },
      {
        "id": "samaaro-team-4",
        "function": "Human Resources",
        "count": 3
      },
      {
        "id": "samaaro-team-5",
        "function": "Arts and Design",
        "count": 3
      }
    ],
    "engDensity": {
      "raw": "0.385",
      "value": 0.385,
      "unitAmbiguous": false
    },
    "taPercent": {
      "raw": "0.038",
      "value": 0.038,
      "unitAmbiguous": false
    },
    "employeeGrowth": null,
    "hiring": {
      "jobs": [
        {
          "id": "samaaro-job-1",
          "index": 1,
          "roles": "Business Development Executive",
          "location": null,
          "source": "Linkedin",
          "recency": "1 week ago",
          "applicants": "Over 100 applicants",
          "status": "accepting (actively reviewing)",
          "jdDuplication": null,
          "reposted": null,
          "hiringManager": null,
          "panel": null,
          "jdAnalysis": null
        },
        {
          "id": "samaaro-job-2",
          "index": 2,
          "roles": "Biz Dev Exe ( 11 ) , Biz Dev Manager (3 ) + 1",
          "location": null,
          "source": "BeBee",
          "recency": "tdy , 2 , 3, 7 days ago , 1 , 2mo ago",
          "applicants": null,
          "status": null,
          "jdDuplication": null,
          "reposted": null,
          "hiringManager": null,
          "panel": null,
          "jdAnalysis": null
        },
        {
          "id": "samaaro-job-3",
          "index": 3,
          "roles": "Biz Dev Exe , Biz Dev Manager",
          "location": null,
          "source": "WellFound",
          "recency": "2 w ago , 1 mo ago",
          "applicants": null,
          "status": null,
          "jdDuplication": null,
          "reposted": null,
          "hiringManager": null,
          "panel": null,
          "jdAnalysis": null
        }
      ],
      "notes": [],
      "columnCounts": {
        "roles": 3,
        "sources": 3,
        "recency": 3,
        "applicants": 1,
        "status": 1
      },
      "externalPartners": [],
      "hiringBadge": {
        "raw": "Yes, Anjali Choudhary"
      },
      "urgency": null,
      "jdDuplication": null,
      "reposts": null,
      "hiringManager": null,
      "panel": null,
      "jdAnalysis": null,
      "teamAnalysis": null,
      "applicantCount": null,
      "hiringPain": null
    },
    "hr": {
      "count": 1,
      "people": [
        {
          "id": "samaaro-person-1",
          "name": "Krupali",
          "function": "HR",
          "linkedin": null
        }
      ],
      "sourceNote": "HR-1\n1. Krupali - HR\n\nTA-1\n1. Anajali Choudhary- Recruiter",
      "statedNone": false
    },
    "ta": {
      "count": 1,
      "people": [
        {
          "id": "samaaro-person-2-ta",
          "name": "Anajali Choudhary",
          "function": "Recruiter",
          "linkedin": null
        }
      ],
      "sourceNote": "HR-1\n1. Krupali - HR\n\nTA-1\n1. Anajali Choudhary- Recruiter",
      "statedNone": false
    },
    "gates": {
      "gate0": {
        "raw": "pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate1": {
        "raw": "Pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate2": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate3": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate4": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      }
    },
    "business": {
      "product": null,
      "growth": null,
      "revenue": null,
      "pmf": null,
      "publicPerception": null,
      "customers": null
    },
    "brief": null,
    "decisionMakers": [],
    "outreach": {
      "status": null,
      "message": null,
      "channel": null,
      "link": null
    },
    "openRoles": {
      "atLeast": 5,
      "exact": false
    },
    "evidence": [
      {
        "id": "samaaro-ev-1",
        "category": "Hiring",
        "observation": "Business Development Executive — Applicants: Over 100 applicants; Listing: accepting (actively reviewing)",
        "source": "Linkedin",
        "sourceUrl": null,
        "recency": "1 week ago",
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "samaaro-ev-2",
        "category": "Hiring",
        "observation": "Biz Dev Exe ( 11 ) , Biz Dev Manager (3 ) + 1",
        "source": "BeBee",
        "sourceUrl": null,
        "recency": "tdy , 2 , 3, 7 days ago , 1 , 2mo ago",
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "samaaro-ev-3",
        "category": "Hiring",
        "observation": "Biz Dev Exe , Biz Dev Manager",
        "source": "WellFound",
        "sourceUrl": null,
        "recency": "2 w ago , 1 mo ago",
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "samaaro-ev-4",
        "category": "Team",
        "observation": "Team composition recorded: Engineering 10, Business Development 6, Marketing 4, Human Resources 3, Arts and Design 3",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Needs verification"
      },
      {
        "id": "samaaro-ev-5",
        "category": "Team",
        "observation": "HR / TA coverage: 1 HR, 1 TA · Krupali (HR), Anajali Choudhary (Recruiter)",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "samaaro-ev-6",
        "category": "Hiring",
        "observation": "LinkedIn hiring badge: Yes, Anjali Choudhary",
        "source": "LinkedIn",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "samaaro-ev-7",
        "category": "Funding",
        "observation": "Pre-Series A: $500,000 (Total: $1.45 million)",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "samaaro-ev-8",
        "category": "Qualification",
        "observation": "Gate 0 recorded as “pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "samaaro-ev-9",
        "category": "Qualification",
        "observation": "Gate 1 recorded as “Pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      }
    ]
  },
  {
    "id": "catalyx-space",
    "slNo": 9,
    "name": "Catalyx Space",
    "foundedYear": 2024,
    "founders": [
      "Rifath Shaarook",
      "Saqib Hussain",
      "Clinton D. Antony",
      "Keerthan Chand Aluvala"
    ],
    "founderNote": null,
    "location": "San Francisco, CA, USA; Bengaluru, Karnataka, India",
    "funding": {
      "type": "Seed",
      "amount": "$5.4 million (Total: $7.1 million)",
      "date": "Oct 2025",
      "amountRaw": "$5.4 million (Total: $7.1 million) – Oct 2025",
      "investors": [
        "Outlander VC",
        "HF0",
        "Techstars",
        "Founders, Inc.",
        "Flybridge Capital Partners",
        "Arka Venture Labs",
        "Vaanam Space LLP",
        "Lex Reddy",
        "KDX Management LLC"
      ]
    },
    "employees": {
      "reported": 35,
      "range": {
        "min": 11,
        "max": 50,
        "label": "11-50 employees"
      },
      "raw": "11-50 employees, 35"
    },
    "team": [
      {
        "id": "catalyx-space-team-1",
        "function": "Engineering",
        "count": 14
      },
      {
        "id": "catalyx-space-team-2",
        "function": "Business Development",
        "count": 9
      },
      {
        "id": "catalyx-space-team-3",
        "function": "Media and Communication",
        "count": 5
      },
      {
        "id": "catalyx-space-team-4",
        "function": "Operations",
        "count": 5
      },
      {
        "id": "catalyx-space-team-5",
        "function": "Research",
        "count": 3
      }
    ],
    "engDensity": {
      "raw": "0.389",
      "value": 0.389,
      "unitAmbiguous": false
    },
    "taPercent": {
      "raw": "0.0",
      "value": 0.0,
      "unitAmbiguous": false
    },
    "employeeGrowth": null,
    "hiring": {
      "jobs": [
        {
          "id": "catalyx-space-job-1",
          "index": 1,
          "roles": "13 Jobs",
          "location": null,
          "source": "Linkedin",
          "recency": "3m ago",
          "applicants": "almost 100 applicants for each jobs",
          "status": "Still accepting",
          "jdDuplication": null,
          "reposted": null,
          "hiringManager": null,
          "panel": null,
          "jdAnalysis": null
        }
      ],
      "notes": [],
      "columnCounts": {
        "roles": 1,
        "sources": 1,
        "recency": 1,
        "applicants": 1,
        "status": 1
      },
      "externalPartners": [
        "Zoho Recruit"
      ],
      "hiringBadge": {
        "raw": null
      },
      "urgency": null,
      "jdDuplication": null,
      "reposts": null,
      "hiringManager": null,
      "panel": null,
      "jdAnalysis": null,
      "teamAnalysis": null,
      "applicantCount": null,
      "hiringPain": null
    },
    "hr": {
      "count": 0,
      "people": [],
      "sourceNote": "No",
      "statedNone": true
    },
    "ta": {
      "count": 0,
      "people": [],
      "sourceNote": "No",
      "statedNone": true
    },
    "gates": {
      "gate0": {
        "raw": "pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate1": {
        "raw": "Pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate2": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate3": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate4": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      }
    },
    "business": {
      "product": null,
      "growth": null,
      "revenue": null,
      "pmf": null,
      "publicPerception": null,
      "customers": null
    },
    "brief": null,
    "decisionMakers": [],
    "outreach": {
      "status": null,
      "message": null,
      "channel": null,
      "link": null
    },
    "openRoles": {
      "atLeast": 13,
      "exact": false
    },
    "evidence": [
      {
        "id": "catalyx-space-ev-1",
        "category": "Hiring",
        "observation": "13 Jobs — Applicants: almost 100 applicants for each jobs; Listing: Still accepting",
        "source": "Linkedin",
        "sourceUrl": null,
        "recency": "3m ago",
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "catalyx-space-ev-2",
        "category": "Team",
        "observation": "Team composition recorded: Engineering 14, Business Development 9, Media and Communication 5, Operations 5, Research 3",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Needs verification"
      },
      {
        "id": "catalyx-space-ev-3",
        "category": "Team",
        "observation": "HR / TA coverage: 0 HR, 0 TA",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "catalyx-space-ev-4",
        "category": "Hiring",
        "observation": "External talent partner in use: Zoho Recruit",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "catalyx-space-ev-5",
        "category": "Funding",
        "observation": "Seed: $5.4 million (Total: $7.1 million)",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "catalyx-space-ev-6",
        "category": "Qualification",
        "observation": "Gate 0 recorded as “pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "catalyx-space-ev-7",
        "category": "Qualification",
        "observation": "Gate 1 recorded as “Pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      }
    ]
  },
  {
    "id": "igowise-mobility",
    "slNo": 10,
    "name": "iGoWise Mobility",
    "foundedYear": 2020,
    "founders": [
      "Sravan Kumar Appana",
      "Sujith Surendran",
      "Suresh Babu Salla"
    ],
    "founderNote": null,
    "location": "Bengaluru, Karnataka, India",
    "funding": {
      "type": "Pre-Seed",
      "amount": "₹8.2 crore (~$1 million)",
      "date": "29 Sep 2025",
      "amountRaw": "₹8.2 crore (~$1 million) – 29 Sep 2025",
      "investors": [
        "888VC",
        "Guptaji VC",
        "ISB Angels",
        "We Founder Circle",
        "DLabs (AIC-ISB)"
      ]
    },
    "employees": {
      "reported": 23,
      "range": {
        "min": 11,
        "max": 50,
        "label": "11-50 employees"
      },
      "raw": "11-50 employees, 23"
    },
    "team": [
      {
        "id": "igowise-mobility-team-1",
        "function": "Engineering",
        "count": 6
      },
      {
        "id": "igowise-mobility-team-2",
        "function": "Operations",
        "count": 5
      },
      {
        "id": "igowise-mobility-team-3",
        "function": "Business Development",
        "count": 3
      },
      {
        "id": "igowise-mobility-team-4",
        "function": "Human Resources",
        "count": 2
      },
      {
        "id": "igowise-mobility-team-5",
        "function": "Sales",
        "count": 2
      }
    ],
    "engDensity": {
      "raw": "0.333",
      "value": 0.333,
      "unitAmbiguous": false
    },
    "taPercent": {
      "raw": "0.0",
      "value": 0.0,
      "unitAmbiguous": false
    },
    "employeeGrowth": null,
    "hiring": {
      "jobs": [],
      "notes": [
        "No jobs in linkedin"
      ],
      "columnCounts": {
        "roles": 1,
        "sources": 0,
        "recency": 0,
        "applicants": 0,
        "status": 0
      },
      "externalPartners": [],
      "hiringBadge": {
        "raw": null
      },
      "urgency": null,
      "jdDuplication": null,
      "reposts": null,
      "hiringManager": null,
      "panel": null,
      "jdAnalysis": null,
      "teamAnalysis": null,
      "applicantCount": null,
      "hiringPain": null
    },
    "hr": {
      "count": null,
      "people": [
        {
          "id": "igowise-mobility-person-1",
          "name": "Keerthi Krishna",
          "function": "HR",
          "linkedin": null
        },
        {
          "id": "igowise-mobility-person-2",
          "name": "Harshitha DV",
          "function": "HR(open to work",
          "linkedin": null
        }
      ],
      "sourceNote": "1. Keerthi Krishna - HR\n2. Harshitha DV- HR(open to work)",
      "statedNone": false
    },
    "ta": {
      "count": null,
      "people": [],
      "sourceNote": "1. Keerthi Krishna - HR\n2. Harshitha DV- HR(open to work)",
      "statedNone": false
    },
    "gates": {
      "gate0": {
        "raw": "pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate1": {
        "raw": "Pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate2": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate3": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate4": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      }
    },
    "business": {
      "product": null,
      "growth": null,
      "revenue": null,
      "pmf": null,
      "publicPerception": null,
      "customers": null
    },
    "brief": null,
    "decisionMakers": [],
    "outreach": {
      "status": null,
      "message": null,
      "channel": null,
      "link": null
    },
    "openRoles": {
      "atLeast": 0,
      "exact": false
    },
    "evidence": [
      {
        "id": "igowise-mobility-ev-1",
        "category": "Hiring",
        "observation": "No jobs in linkedin",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "igowise-mobility-ev-2",
        "category": "Team",
        "observation": "Team composition recorded: Engineering 6, Operations 5, Business Development 3, Human Resources 2, Sales 2",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Needs verification"
      },
      {
        "id": "igowise-mobility-ev-3",
        "category": "Team",
        "observation": "HR / TA coverage: Keerthi Krishna (HR), Harshitha DV (HR(open to work)",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "igowise-mobility-ev-4",
        "category": "Funding",
        "observation": "Pre-Seed: ₹8.2 crore (~$1 million)",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "igowise-mobility-ev-5",
        "category": "Qualification",
        "observation": "Gate 0 recorded as “pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "igowise-mobility-ev-6",
        "category": "Qualification",
        "observation": "Gate 1 recorded as “Pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      }
    ]
  },
  {
    "id": "biodimension-technology",
    "slNo": 11,
    "name": "BioDimension Technology",
    "foundedYear": 2021,
    "founders": [
      "Manojkumar S.",
      "Ranjith Kumar Velusamy",
      "Pradeep Arunachalam"
    ],
    "founderNote": null,
    "location": "Bengaluru, Karnataka, India",
    "funding": {
      "type": "Seed",
      "amount": "₹8 crore (~$960K) (Total: ₹9.21 crore / ~$1.1 million)",
      "date": "11 Jun 2026",
      "amountRaw": "₹8 crore (~$960K) (Total: ₹9.21 crore / ~$1.1 million) – 11 Jun 2026",
      "investors": [
        "IAN Angel Fund",
        "Campus Angels Network",
        "Dr. Sampath Srisailam",
        "Aaryan Baid",
        "Venture Center (BIG Grant)",
        "PETA India"
      ]
    },
    "employees": {
      "reported": null,
      "range": {
        "min": 11,
        "max": 50,
        "label": "11-50 employees"
      },
      "raw": "11-50 employees"
    },
    "team": [
      {
        "id": "biodimension-technology-team-1",
        "function": "Business Development",
        "count": 8
      },
      {
        "id": "biodimension-technology-team-2",
        "function": "Research",
        "count": 7
      },
      {
        "id": "biodimension-technology-team-3",
        "function": "Program and Project Management",
        "count": 2
      },
      {
        "id": "biodimension-technology-team-4",
        "function": "Information Technology",
        "count": 1
      },
      {
        "id": "biodimension-technology-team-5",
        "function": "Marketing",
        "count": 1
      }
    ],
    "engDensity": {
      "raw": "0.0",
      "value": 0.0,
      "unitAmbiguous": false
    },
    "taPercent": {
      "raw": "0.0",
      "value": 0.0,
      "unitAmbiguous": false
    },
    "employeeGrowth": null,
    "hiring": {
      "jobs": [],
      "notes": [],
      "columnCounts": {
        "roles": 0,
        "sources": 0,
        "recency": 0,
        "applicants": 0,
        "status": 0
      },
      "externalPartners": [],
      "hiringBadge": {
        "raw": null
      },
      "urgency": null,
      "jdDuplication": null,
      "reposts": null,
      "hiringManager": null,
      "panel": null,
      "jdAnalysis": null,
      "teamAnalysis": null,
      "applicantCount": null,
      "hiringPain": null
    },
    "hr": {
      "count": 0,
      "people": [],
      "sourceNote": "no",
      "statedNone": true
    },
    "ta": {
      "count": 0,
      "people": [],
      "sourceNote": "no",
      "statedNone": true
    },
    "gates": {
      "gate0": {
        "raw": "pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate1": {
        "raw": "Fail, Engg Density",
        "result": "fail",
        "reason": "Engg Density",
        "notes": null,
        "evidence": null
      },
      "gate2": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate3": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate4": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      }
    },
    "business": {
      "product": null,
      "growth": null,
      "revenue": null,
      "pmf": null,
      "publicPerception": null,
      "customers": null
    },
    "brief": null,
    "decisionMakers": [],
    "outreach": {
      "status": null,
      "message": null,
      "channel": null,
      "link": null
    },
    "openRoles": {
      "atLeast": 0,
      "exact": false
    },
    "evidence": [
      {
        "id": "biodimension-technology-ev-1",
        "category": "Team",
        "observation": "Team composition recorded: Business Development 8, Research 7, Program and Project Management 2, Information Technology 1, Marketing 1",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Needs verification"
      },
      {
        "id": "biodimension-technology-ev-2",
        "category": "Team",
        "observation": "HR / TA coverage: 0 HR, 0 TA",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "biodimension-technology-ev-3",
        "category": "Funding",
        "observation": "Seed: ₹8 crore (~$960K) (Total: ₹9.21 crore / ~$1.1 million)",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "biodimension-technology-ev-4",
        "category": "Qualification",
        "observation": "Gate 0 recorded as “pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "biodimension-technology-ev-5",
        "category": "Qualification",
        "observation": "Gate 1 recorded as “Fail, Engg Density”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      }
    ]
  },
  {
    "id": "propsoch",
    "slNo": 12,
    "name": "Propsoch",
    "foundedYear": 2022,
    "founders": [
      "Ashish Acharya",
      "Ravi Agrawal"
    ],
    "founderNote": null,
    "location": "Bengaluru, Karnataka, India",
    "funding": {
      "type": "Seed",
      "amount": "$2 million (₹19.1 crore) (Total: $2.6 million)",
      "date": "3 Jun 2026",
      "amountRaw": "$2 million (₹19.1 crore) (Total: $2.6 million) – 3 Jun 2026",
      "investors": [
        "Athera Venture Partners",
        "Sparrow Capital",
        "Vakil Group",
        "Godrej Group Family Offices",
        "Mohit Malhotra",
        "Bhaskar Bhat"
      ]
    },
    "employees": {
      "reported": null,
      "range": null,
      "raw": null
    },
    "team": [
      {
        "id": "propsoch-team-1",
        "function": "Marketing",
        "count": 9
      },
      {
        "id": "propsoch-team-2",
        "function": "Business Development",
        "count": 9
      },
      {
        "id": "propsoch-team-3",
        "function": "Engineering",
        "count": 7
      },
      {
        "id": "propsoch-team-4",
        "function": "Information Technology",
        "count": 4
      },
      {
        "id": "propsoch-team-5",
        "function": "Media and Communication",
        "count": 4
      }
    ],
    "engDensity": {
      "raw": "0.2121",
      "value": 0.2121,
      "unitAmbiguous": false
    },
    "taPercent": {
      "raw": null,
      "value": null,
      "unitAmbiguous": false
    },
    "employeeGrowth": null,
    "hiring": {
      "jobs": [],
      "notes": [],
      "columnCounts": {
        "roles": 0,
        "sources": 0,
        "recency": 0,
        "applicants": 0,
        "status": 0
      },
      "externalPartners": [],
      "hiringBadge": {
        "raw": null
      },
      "urgency": null,
      "jdDuplication": null,
      "reposts": null,
      "hiringManager": null,
      "panel": null,
      "jdAnalysis": null,
      "teamAnalysis": null,
      "applicantCount": null,
      "hiringPain": null
    },
    "hr": {
      "count": null,
      "people": [],
      "sourceNote": null,
      "statedNone": false
    },
    "ta": {
      "count": null,
      "people": [],
      "sourceNote": null,
      "statedNone": false
    },
    "gates": {
      "gate0": {
        "raw": "pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate1": {
        "raw": "Fail, Engg Density",
        "result": "fail",
        "reason": "Engg Density",
        "notes": null,
        "evidence": null
      },
      "gate2": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate3": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate4": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      }
    },
    "business": {
      "product": null,
      "growth": null,
      "revenue": null,
      "pmf": null,
      "publicPerception": null,
      "customers": null
    },
    "brief": null,
    "decisionMakers": [],
    "outreach": {
      "status": null,
      "message": null,
      "channel": null,
      "link": null
    },
    "openRoles": {
      "atLeast": 0,
      "exact": false
    },
    "evidence": [
      {
        "id": "propsoch-ev-1",
        "category": "Team",
        "observation": "Team composition recorded: Marketing 9, Business Development 9, Engineering 7, Information Technology 4, Media and Communication 4",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Needs verification"
      },
      {
        "id": "propsoch-ev-2",
        "category": "Funding",
        "observation": "Seed: $2 million (₹19.1 crore) (Total: $2.6 million)",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "propsoch-ev-3",
        "category": "Qualification",
        "observation": "Gate 0 recorded as “pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "propsoch-ev-4",
        "category": "Qualification",
        "observation": "Gate 1 recorded as “Fail, Engg Density”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      }
    ]
  },
  {
    "id": "shree-bhagavathi-tech-labs",
    "slNo": 13,
    "name": "Shree Bhagavathi Tech Labs",
    "foundedYear": 2024,
    "founders": [
      "Shiva Shankar Kumar H"
    ],
    "founderNote": null,
    "location": "Bengaluru, Karnataka, India",
    "funding": {
      "type": "Venture Stage",
      "amount": "$250 million initial tranche (Target Raise: ₹50,000 crore / ~$6 billion)",
      "date": "24–25 Apr 2026",
      "amountRaw": "$250 million initial tranche (Target Raise: ₹50,000 crore / ~$6 billion) – 24–25 Apr 2026",
      "investors": [
        "SoftBank",
        "700 Capital LLC"
      ]
    },
    "employees": {
      "reported": null,
      "range": null,
      "raw": null
    },
    "team": [],
    "engDensity": {
      "raw": null,
      "value": null,
      "unitAmbiguous": false
    },
    "taPercent": {
      "raw": null,
      "value": null,
      "unitAmbiguous": false
    },
    "employeeGrowth": null,
    "hiring": {
      "jobs": [],
      "notes": [],
      "columnCounts": {
        "roles": 0,
        "sources": 0,
        "recency": 0,
        "applicants": 0,
        "status": 0
      },
      "externalPartners": [],
      "hiringBadge": {
        "raw": null
      },
      "urgency": null,
      "jdDuplication": null,
      "reposts": null,
      "hiringManager": null,
      "panel": null,
      "jdAnalysis": null,
      "teamAnalysis": null,
      "applicantCount": null,
      "hiringPain": null
    },
    "hr": {
      "count": null,
      "people": [],
      "sourceNote": null,
      "statedNone": false
    },
    "ta": {
      "count": null,
      "people": [],
      "sourceNote": null,
      "statedNone": false
    },
    "gates": {
      "gate0": {
        "raw": "pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate1": {
        "raw": "Fail, No linkedin",
        "result": "fail",
        "reason": "No linkedin",
        "notes": null,
        "evidence": null
      },
      "gate2": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate3": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate4": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      }
    },
    "business": {
      "product": null,
      "growth": null,
      "revenue": null,
      "pmf": null,
      "publicPerception": null,
      "customers": null
    },
    "brief": null,
    "decisionMakers": [],
    "outreach": {
      "status": null,
      "message": null,
      "channel": null,
      "link": null
    },
    "openRoles": {
      "atLeast": 0,
      "exact": false
    },
    "evidence": [
      {
        "id": "shree-bhagavathi-tech-labs-ev-1",
        "category": "Funding",
        "observation": "Venture Stage: $250 million initial tranche (Target Raise: ₹50,000 crore / ~$6 billion)",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "shree-bhagavathi-tech-labs-ev-2",
        "category": "Qualification",
        "observation": "Gate 0 recorded as “pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "shree-bhagavathi-tech-labs-ev-3",
        "category": "Qualification",
        "observation": "Gate 1 recorded as “Fail, No linkedin”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      }
    ]
  },
  {
    "id": "stch",
    "slNo": 14,
    "name": "STCH",
    "foundedYear": 2025,
    "founders": [
      "Narahari Payala",
      "Aseem Chitkara"
    ],
    "founderNote": null,
    "location": "Bengaluru, Karnataka, India",
    "funding": {
      "type": "Pre-Series A",
      "amount": "$5.5–7 million",
      "date": "23 Apr 2026",
      "amountRaw": "$5.5–7 million – 23 Apr 2026",
      "investors": [
        "Omnivore Venture Capital",
        "Kae Capital",
        "WVC"
      ]
    },
    "employees": {
      "reported": null,
      "range": null,
      "raw": null
    },
    "team": [
      {
        "id": "stch-team-1",
        "function": "Business Development",
        "count": 6
      },
      {
        "id": "stch-team-2",
        "function": "Marketing",
        "count": 5
      },
      {
        "id": "stch-team-3",
        "function": "Purchasing",
        "count": 3
      },
      {
        "id": "stch-team-4",
        "function": "Finance",
        "count": 2
      },
      {
        "id": "stch-team-5",
        "function": "Operations",
        "count": 2
      }
    ],
    "engDensity": {
      "raw": "0.0",
      "value": 0.0,
      "unitAmbiguous": false
    },
    "taPercent": {
      "raw": null,
      "value": null,
      "unitAmbiguous": false
    },
    "employeeGrowth": null,
    "hiring": {
      "jobs": [],
      "notes": [],
      "columnCounts": {
        "roles": 0,
        "sources": 0,
        "recency": 0,
        "applicants": 0,
        "status": 0
      },
      "externalPartners": [],
      "hiringBadge": {
        "raw": null
      },
      "urgency": null,
      "jdDuplication": null,
      "reposts": null,
      "hiringManager": null,
      "panel": null,
      "jdAnalysis": null,
      "teamAnalysis": null,
      "applicantCount": null,
      "hiringPain": null
    },
    "hr": {
      "count": null,
      "people": [],
      "sourceNote": null,
      "statedNone": false
    },
    "ta": {
      "count": null,
      "people": [],
      "sourceNote": null,
      "statedNone": false
    },
    "gates": {
      "gate0": {
        "raw": "pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate1": {
        "raw": "Fail, Engg Density",
        "result": "fail",
        "reason": "Engg Density",
        "notes": null,
        "evidence": null
      },
      "gate2": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate3": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate4": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      }
    },
    "business": {
      "product": null,
      "growth": null,
      "revenue": null,
      "pmf": null,
      "publicPerception": null,
      "customers": null
    },
    "brief": null,
    "decisionMakers": [],
    "outreach": {
      "status": null,
      "message": null,
      "channel": null,
      "link": null
    },
    "openRoles": {
      "atLeast": 0,
      "exact": false
    },
    "evidence": [
      {
        "id": "stch-ev-1",
        "category": "Team",
        "observation": "Team composition recorded: Business Development 6, Marketing 5, Purchasing 3, Finance 2, Operations 2",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Needs verification"
      },
      {
        "id": "stch-ev-2",
        "category": "Funding",
        "observation": "Pre-Series A: $5.5–7 million",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "stch-ev-3",
        "category": "Qualification",
        "observation": "Gate 0 recorded as “pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "stch-ev-4",
        "category": "Qualification",
        "observation": "Gate 1 recorded as “Fail, Engg Density”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      }
    ]
  },
  {
    "id": "acai-theory",
    "slNo": 15,
    "name": "Acai Theory",
    "foundedYear": 2025,
    "founders": [
      "Rishav Ranjan",
      "Akash Kyal"
    ],
    "founderNote": null,
    "location": "Bengaluru, Karnataka, India",
    "funding": {
      "type": "Pre-Seed",
      "amount": "₹4 crore (~$427.7K)",
      "date": "21 Apr 2026",
      "amountRaw": "₹4 crore (~$427.7K) – 21 Apr 2026",
      "investors": [
        "All In Capital",
        "TDV Partners",
        "Rinshul Chandra",
        "Harpreet Grover",
        "Anurag Prasad",
        "Harish Varadarajan"
      ]
    },
    "employees": {
      "reported": null,
      "range": null,
      "raw": null
    },
    "team": [
      {
        "id": "acai-theory-team-1",
        "function": "Business Development",
        "count": 3
      },
      {
        "id": "acai-theory-team-2",
        "function": "Sales",
        "count": 2
      },
      {
        "id": "acai-theory-team-3",
        "function": "Marketing",
        "count": 1
      },
      {
        "id": "acai-theory-team-4",
        "function": "Operations",
        "count": 1
      }
    ],
    "engDensity": {
      "raw": "0.0",
      "value": 0.0,
      "unitAmbiguous": false
    },
    "taPercent": {
      "raw": null,
      "value": null,
      "unitAmbiguous": false
    },
    "employeeGrowth": null,
    "hiring": {
      "jobs": [],
      "notes": [],
      "columnCounts": {
        "roles": 0,
        "sources": 0,
        "recency": 0,
        "applicants": 0,
        "status": 0
      },
      "externalPartners": [],
      "hiringBadge": {
        "raw": null
      },
      "urgency": null,
      "jdDuplication": null,
      "reposts": null,
      "hiringManager": null,
      "panel": null,
      "jdAnalysis": null,
      "teamAnalysis": null,
      "applicantCount": null,
      "hiringPain": null
    },
    "hr": {
      "count": null,
      "people": [],
      "sourceNote": null,
      "statedNone": false
    },
    "ta": {
      "count": null,
      "people": [],
      "sourceNote": null,
      "statedNone": false
    },
    "gates": {
      "gate0": {
        "raw": "pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate1": {
        "raw": "Fail, Engg Density",
        "result": "fail",
        "reason": "Engg Density",
        "notes": null,
        "evidence": null
      },
      "gate2": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate3": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate4": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      }
    },
    "business": {
      "product": null,
      "growth": null,
      "revenue": null,
      "pmf": null,
      "publicPerception": null,
      "customers": null
    },
    "brief": null,
    "decisionMakers": [],
    "outreach": {
      "status": null,
      "message": null,
      "channel": null,
      "link": null
    },
    "openRoles": {
      "atLeast": 0,
      "exact": false
    },
    "evidence": [
      {
        "id": "acai-theory-ev-1",
        "category": "Team",
        "observation": "Team composition recorded: Business Development 3, Sales 2, Marketing 1, Operations 1",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Needs verification"
      },
      {
        "id": "acai-theory-ev-2",
        "category": "Funding",
        "observation": "Pre-Seed: ₹4 crore (~$427.7K)",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "acai-theory-ev-3",
        "category": "Qualification",
        "observation": "Gate 0 recorded as “pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "acai-theory-ev-4",
        "category": "Qualification",
        "observation": "Gate 1 recorded as “Fail, Engg Density”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      }
    ]
  },
  {
    "id": "helium",
    "slNo": 16,
    "name": "Helium",
    "foundedYear": 2025,
    "founders": [
      "Sahil Ludhani",
      "Ashutosh Tandon"
    ],
    "founderNote": null,
    "location": "Bengaluru, Karnataka, India",
    "funding": {
      "type": "Angel",
      "amount": "₹5 crore (~$600K)",
      "date": "14–15 Apr 2026",
      "amountRaw": "₹5 crore (~$600K) – 14–15 Apr 2026",
      "investors": [
        "Kunal Shah",
        "Albinder Dhindsa",
        "Pankaj Chaddah",
        "Mohit Gupta",
        "Akriti Chopra",
        "Gunjan Patidar",
        "Nitin Gupta",
        "Surobhi Das",
        "Peercheque Syndicate (Miten Sampat",
        "Aakrit Vaish)"
      ]
    },
    "employees": {
      "reported": null,
      "range": null,
      "raw": null
    },
    "team": [],
    "engDensity": {
      "raw": "0.0",
      "value": 0.0,
      "unitAmbiguous": false
    },
    "taPercent": {
      "raw": null,
      "value": null,
      "unitAmbiguous": false
    },
    "employeeGrowth": null,
    "hiring": {
      "jobs": [],
      "notes": [],
      "columnCounts": {
        "roles": 0,
        "sources": 0,
        "recency": 0,
        "applicants": 0,
        "status": 0
      },
      "externalPartners": [],
      "hiringBadge": {
        "raw": null
      },
      "urgency": null,
      "jdDuplication": null,
      "reposts": null,
      "hiringManager": null,
      "panel": null,
      "jdAnalysis": null,
      "teamAnalysis": null,
      "applicantCount": null,
      "hiringPain": null
    },
    "hr": {
      "count": null,
      "people": [],
      "sourceNote": null,
      "statedNone": false
    },
    "ta": {
      "count": null,
      "people": [],
      "sourceNote": null,
      "statedNone": false
    },
    "gates": {
      "gate0": {
        "raw": "pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate1": {
        "raw": "Fail, Engg Density",
        "result": "fail",
        "reason": "Engg Density",
        "notes": null,
        "evidence": null
      },
      "gate2": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate3": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate4": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      }
    },
    "business": {
      "product": null,
      "growth": null,
      "revenue": null,
      "pmf": null,
      "publicPerception": null,
      "customers": null
    },
    "brief": null,
    "decisionMakers": [],
    "outreach": {
      "status": null,
      "message": null,
      "channel": null,
      "link": null
    },
    "openRoles": {
      "atLeast": 0,
      "exact": false
    },
    "evidence": [
      {
        "id": "helium-ev-1",
        "category": "Funding",
        "observation": "Angel: ₹5 crore (~$600K)",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "helium-ev-2",
        "category": "Qualification",
        "observation": "Gate 0 recorded as “pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "helium-ev-3",
        "category": "Qualification",
        "observation": "Gate 1 recorded as “Fail, Engg Density”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      }
    ]
  },
  {
    "id": "h2loop",
    "slNo": 17,
    "name": "H2LooP",
    "foundedYear": 2025,
    "founders": [
      "Sairanjan Mishra",
      "Pulkit Agrawal"
    ],
    "founderNote": "1. Prakhar Agrawal(Hiring badgs)",
    "location": "Bengaluru, Karnataka, India",
    "funding": {
      "type": "Seed",
      "amount": "$2 million (₹18.6 crore)",
      "date": "7 Apr 2026",
      "amountRaw": "$2 million (₹18.6 crore) – 7 Apr 2026",
      "investors": [
        "Speciale Invest",
        "3one4 Capital"
      ]
    },
    "employees": {
      "reported": null,
      "range": {
        "min": 11,
        "max": 50,
        "label": "11-50 employees"
      },
      "raw": "11-50 employees"
    },
    "team": [
      {
        "id": "h2loop-team-1",
        "function": "Engineering",
        "count": 12
      },
      {
        "id": "h2loop-team-2",
        "function": "Business Development",
        "count": 3
      },
      {
        "id": "h2loop-team-3",
        "function": "Marketing",
        "count": 2
      },
      {
        "id": "h2loop-team-4",
        "function": "Sales",
        "count": 2
      },
      {
        "id": "h2loop-team-5",
        "function": "Entrepreneurship",
        "count": 2
      }
    ],
    "engDensity": {
      "raw": "0.5714",
      "value": 0.5714,
      "unitAmbiguous": false
    },
    "taPercent": {
      "raw": "0.0",
      "value": 0.0,
      "unitAmbiguous": false
    },
    "employeeGrowth": null,
    "hiring": {
      "jobs": [
        {
          "id": "h2loop-job-1",
          "index": 1,
          "roles": "Forward Deployed Engineer",
          "location": null,
          "source": "Linkedin",
          "recency": "6 days ago",
          "applicants": "27 people clicked apply",
          "status": "Still accepting",
          "jdDuplication": null,
          "reposted": null,
          "hiringManager": null,
          "panel": null,
          "jdAnalysis": null
        }
      ],
      "notes": [],
      "columnCounts": {
        "roles": 1,
        "sources": 1,
        "recency": 1,
        "applicants": 1,
        "status": 1
      },
      "externalPartners": [],
      "hiringBadge": {
        "raw": "yes,Prakhar Agrawal"
      },
      "urgency": null,
      "jdDuplication": null,
      "reposts": null,
      "hiringManager": null,
      "panel": null,
      "jdAnalysis": null,
      "teamAnalysis": null,
      "applicantCount": null,
      "hiringPain": null
    },
    "hr": {
      "count": 0,
      "people": [],
      "sourceNote": "No",
      "statedNone": true
    },
    "ta": {
      "count": 0,
      "people": [],
      "sourceNote": "No",
      "statedNone": true
    },
    "gates": {
      "gate0": {
        "raw": "pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate1": {
        "raw": "pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate2": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate3": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate4": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      }
    },
    "business": {
      "product": null,
      "growth": null,
      "revenue": null,
      "pmf": null,
      "publicPerception": null,
      "customers": null
    },
    "brief": null,
    "decisionMakers": [],
    "outreach": {
      "status": null,
      "message": null,
      "channel": null,
      "link": null
    },
    "openRoles": {
      "atLeast": 1,
      "exact": true
    },
    "evidence": [
      {
        "id": "h2loop-ev-1",
        "category": "Hiring",
        "observation": "Forward Deployed Engineer — Applicants: 27 people clicked apply; Listing: Still accepting",
        "source": "Linkedin",
        "sourceUrl": null,
        "recency": "6 days ago",
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "h2loop-ev-2",
        "category": "Team",
        "observation": "Team composition recorded: Engineering 12, Business Development 3, Marketing 2, Sales 2, Entrepreneurship 2",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Needs verification"
      },
      {
        "id": "h2loop-ev-3",
        "category": "Team",
        "observation": "HR / TA coverage: 0 HR, 0 TA",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "h2loop-ev-4",
        "category": "Hiring",
        "observation": "LinkedIn hiring badge: yes,Prakhar Agrawal",
        "source": "LinkedIn",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "h2loop-ev-5",
        "category": "Funding",
        "observation": "Seed: $2 million (₹18.6 crore)",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "h2loop-ev-6",
        "category": "Qualification",
        "observation": "Gate 0 recorded as “pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "h2loop-ev-7",
        "category": "Qualification",
        "observation": "Gate 1 recorded as “pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      }
    ]
  },
  {
    "id": "fanon",
    "slNo": 18,
    "name": "Fanon",
    "foundedYear": 2024,
    "founders": [
      "Jatin Nayak",
      "Nesar Rao",
      "Arvindmani Satyanarayan"
    ],
    "founderNote": null,
    "location": "Bengaluru, Karnataka, India",
    "funding": {
      "type": "Pre-Seed",
      "amount": "$1 million",
      "date": "31 Mar 2026",
      "amountRaw": "$1 million – 31 Mar 2026",
      "investors": [
        "Kalaari Capital",
        "Gruhas"
      ]
    },
    "employees": {
      "reported": 15,
      "range": {
        "min": 11,
        "max": 50,
        "label": "11-50 employees"
      },
      "raw": "11-50 employees, 15"
    },
    "team": [
      {
        "id": "fanon-team-1",
        "function": "Engineering",
        "count": 7
      },
      {
        "id": "fanon-team-2",
        "function": "Business Development",
        "count": 3
      },
      {
        "id": "fanon-team-3",
        "function": "Marketing",
        "count": 2
      },
      {
        "id": "fanon-team-4",
        "function": "Arts and Design",
        "count": 2
      },
      {
        "id": "fanon-team-5",
        "function": "Information Technology",
        "count": 1
      }
    ],
    "engDensity": {
      "raw": "0.4667",
      "value": 0.4667,
      "unitAmbiguous": false
    },
    "taPercent": {
      "raw": "0.0",
      "value": 0.0,
      "unitAmbiguous": false
    },
    "employeeGrowth": null,
    "hiring": {
      "jobs": [],
      "notes": [
        "no jobs linkedin"
      ],
      "columnCounts": {
        "roles": 1,
        "sources": 0,
        "recency": 0,
        "applicants": 0,
        "status": 0
      },
      "externalPartners": [],
      "hiringBadge": {
        "raw": null
      },
      "urgency": null,
      "jdDuplication": null,
      "reposts": null,
      "hiringManager": null,
      "panel": null,
      "jdAnalysis": null,
      "teamAnalysis": null,
      "applicantCount": null,
      "hiringPain": null
    },
    "hr": {
      "count": 0,
      "people": [],
      "sourceNote": "No",
      "statedNone": true
    },
    "ta": {
      "count": 0,
      "people": [],
      "sourceNote": "No",
      "statedNone": true
    },
    "gates": {
      "gate0": {
        "raw": "pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate1": {
        "raw": "pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate2": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate3": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate4": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      }
    },
    "business": {
      "product": null,
      "growth": null,
      "revenue": null,
      "pmf": null,
      "publicPerception": null,
      "customers": null
    },
    "brief": null,
    "decisionMakers": [],
    "outreach": {
      "status": null,
      "message": null,
      "channel": null,
      "link": null
    },
    "openRoles": {
      "atLeast": 0,
      "exact": false
    },
    "evidence": [
      {
        "id": "fanon-ev-1",
        "category": "Hiring",
        "observation": "no jobs linkedin",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "fanon-ev-2",
        "category": "Team",
        "observation": "Team composition recorded: Engineering 7, Business Development 3, Marketing 2, Arts and Design 2, Information Technology 1",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Needs verification"
      },
      {
        "id": "fanon-ev-3",
        "category": "Team",
        "observation": "HR / TA coverage: 0 HR, 0 TA",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "fanon-ev-4",
        "category": "Funding",
        "observation": "Pre-Seed: $1 million",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "fanon-ev-5",
        "category": "Qualification",
        "observation": "Gate 0 recorded as “pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "fanon-ev-6",
        "category": "Qualification",
        "observation": "Gate 1 recorded as “pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      }
    ]
  },
  {
    "id": "drickle",
    "slNo": 19,
    "name": "Drickle",
    "foundedYear": 2020,
    "founders": [
      "Vardhman Jain",
      "Rahul Nijhawan",
      "Armaan Reet"
    ],
    "founderNote": null,
    "location": "Bengaluru, Karnataka, India",
    "funding": {
      "type": "Seed",
      "amount": "₹6 crore (~$720K) (Total: ~$1.87 million / ₹15.6 crore)",
      "date": "13 Jan 2026",
      "amountRaw": "₹6 crore (~$720K) (Total: ~$1.87 million / ₹15.6 crore) – 13 Jan 2026",
      "investors": [
        "Ideabaaz",
        "Param Kandhari",
        "Naresh Krishnaswamy",
        "Abhinav Mathur",
        "Hemanshu Jain",
        "Vinay Bhopatkar",
        "Vaibhav Sisinty",
        "Dalvir Suri",
        "Rishit Jhunjhunwala"
      ]
    },
    "employees": {
      "reported": 14,
      "range": {
        "min": 2,
        "max": 10,
        "label": "2-10 employees"
      },
      "raw": "2-10 employees, 14"
    },
    "team": [],
    "engDensity": {
      "raw": "0.0",
      "value": 0.0,
      "unitAmbiguous": false
    },
    "taPercent": {
      "raw": null,
      "value": null,
      "unitAmbiguous": false
    },
    "employeeGrowth": null,
    "hiring": {
      "jobs": [],
      "notes": [],
      "columnCounts": {
        "roles": 0,
        "sources": 0,
        "recency": 0,
        "applicants": 0,
        "status": 0
      },
      "externalPartners": [],
      "hiringBadge": {
        "raw": null
      },
      "urgency": null,
      "jdDuplication": null,
      "reposts": null,
      "hiringManager": null,
      "panel": null,
      "jdAnalysis": null,
      "teamAnalysis": null,
      "applicantCount": null,
      "hiringPain": null
    },
    "hr": {
      "count": null,
      "people": [],
      "sourceNote": null,
      "statedNone": false
    },
    "ta": {
      "count": null,
      "people": [],
      "sourceNote": null,
      "statedNone": false
    },
    "gates": {
      "gate0": {
        "raw": "pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate1": {
        "raw": "Fail, Engg Density",
        "result": "fail",
        "reason": "Engg Density",
        "notes": null,
        "evidence": null
      },
      "gate2": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate3": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate4": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      }
    },
    "business": {
      "product": null,
      "growth": null,
      "revenue": null,
      "pmf": null,
      "publicPerception": null,
      "customers": null
    },
    "brief": null,
    "decisionMakers": [],
    "outreach": {
      "status": null,
      "message": null,
      "channel": null,
      "link": null
    },
    "openRoles": {
      "atLeast": 0,
      "exact": false
    },
    "evidence": [
      {
        "id": "drickle-ev-1",
        "category": "Funding",
        "observation": "Seed: ₹6 crore (~$720K) (Total: ~$1.87 million / ₹15.6 crore)",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "drickle-ev-2",
        "category": "Qualification",
        "observation": "Gate 0 recorded as “pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "drickle-ev-3",
        "category": "Qualification",
        "observation": "Gate 1 recorded as “Fail, Engg Density”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      }
    ]
  },
  {
    "id": "dazzl",
    "slNo": 20,
    "name": "Dazzl",
    "foundedYear": 2025,
    "founders": [
      "Komal Solanki",
      "Ashish Bajpai"
    ],
    "founderNote": null,
    "location": "Bengaluru, Karnataka, India",
    "funding": {
      "type": "Seed",
      "amount": "$3.2 million (₹27.64 crore)",
      "date": "13 Jan 2026",
      "amountRaw": "$3.2 million (₹27.64 crore) – 13 Jan 2026",
      "investors": [
        "Stellaris Venture Partners",
        "Ritesh Agarwal",
        "Abhishek Bansal",
        "Sameer Brij Verma",
        "Abhinav Sinha",
        "Maninder Gulati"
      ]
    },
    "employees": {
      "reported": null,
      "range": null,
      "raw": null
    },
    "team": [],
    "engDensity": {
      "raw": "0.0",
      "value": 0.0,
      "unitAmbiguous": false
    },
    "taPercent": {
      "raw": null,
      "value": null,
      "unitAmbiguous": false
    },
    "employeeGrowth": null,
    "hiring": {
      "jobs": [],
      "notes": [],
      "columnCounts": {
        "roles": 0,
        "sources": 0,
        "recency": 0,
        "applicants": 0,
        "status": 0
      },
      "externalPartners": [],
      "hiringBadge": {
        "raw": null
      },
      "urgency": null,
      "jdDuplication": null,
      "reposts": null,
      "hiringManager": null,
      "panel": null,
      "jdAnalysis": null,
      "teamAnalysis": null,
      "applicantCount": null,
      "hiringPain": null
    },
    "hr": {
      "count": null,
      "people": [],
      "sourceNote": null,
      "statedNone": false
    },
    "ta": {
      "count": null,
      "people": [],
      "sourceNote": null,
      "statedNone": false
    },
    "gates": {
      "gate0": {
        "raw": "pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate1": {
        "raw": "Fail, Engg Density",
        "result": "fail",
        "reason": "Engg Density",
        "notes": null,
        "evidence": null
      },
      "gate2": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate3": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate4": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      }
    },
    "business": {
      "product": null,
      "growth": null,
      "revenue": null,
      "pmf": null,
      "publicPerception": null,
      "customers": null
    },
    "brief": null,
    "decisionMakers": [],
    "outreach": {
      "status": null,
      "message": null,
      "channel": null,
      "link": null
    },
    "openRoles": {
      "atLeast": 0,
      "exact": false
    },
    "evidence": [
      {
        "id": "dazzl-ev-1",
        "category": "Funding",
        "observation": "Seed: $3.2 million (₹27.64 crore)",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "dazzl-ev-2",
        "category": "Qualification",
        "observation": "Gate 0 recorded as “pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "dazzl-ev-3",
        "category": "Qualification",
        "observation": "Gate 1 recorded as “Fail, Engg Density”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      }
    ]
  },
  {
    "id": "iztri",
    "slNo": 21,
    "name": "Iztri",
    "foundedYear": 2024,
    "founders": [
      "Rohit Ramesh",
      "Ankit Choudhary"
    ],
    "founderNote": null,
    "location": "Bengaluru, Karnataka, India",
    "funding": {
      "type": "Pre-Seed",
      "amount": "₹1.5 crore (~$180K) (Total: ~$245K / ₹2 crore)",
      "date": "29 Nov–2 Dec 2025",
      "amountRaw": "₹1.5 crore (~$180K) (Total: ~$245K / ₹2 crore) – 29 Nov–2 Dec 2025",
      "investors": [
        "AJVC (A Junior VC)",
        "PedalStart",
        "3 institutional funds",
        "12 angel investors"
      ]
    },
    "employees": {
      "reported": null,
      "range": null,
      "raw": null
    },
    "team": [
      {
        "id": "iztri-team-1",
        "function": "Business Development",
        "count": 5
      },
      {
        "id": "iztri-team-2",
        "function": "Information Technology",
        "count": 3
      },
      {
        "id": "iztri-team-3",
        "function": "Administrative",
        "count": 2
      },
      {
        "id": "iztri-team-4",
        "function": "Sales",
        "count": 2
      },
      {
        "id": "iztri-team-5",
        "function": "Engineering",
        "count": 2
      }
    ],
    "engDensity": {
      "raw": "0.14",
      "value": 0.14,
      "unitAmbiguous": false
    },
    "taPercent": {
      "raw": null,
      "value": null,
      "unitAmbiguous": false
    },
    "employeeGrowth": null,
    "hiring": {
      "jobs": [],
      "notes": [],
      "columnCounts": {
        "roles": 0,
        "sources": 0,
        "recency": 0,
        "applicants": 0,
        "status": 0
      },
      "externalPartners": [],
      "hiringBadge": {
        "raw": null
      },
      "urgency": null,
      "jdDuplication": null,
      "reposts": null,
      "hiringManager": null,
      "panel": null,
      "jdAnalysis": null,
      "teamAnalysis": null,
      "applicantCount": null,
      "hiringPain": null
    },
    "hr": {
      "count": null,
      "people": [],
      "sourceNote": null,
      "statedNone": false
    },
    "ta": {
      "count": null,
      "people": [],
      "sourceNote": null,
      "statedNone": false
    },
    "gates": {
      "gate0": {
        "raw": "pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate1": {
        "raw": "Fail, Engg Density",
        "result": "fail",
        "reason": "Engg Density",
        "notes": null,
        "evidence": null
      },
      "gate2": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate3": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate4": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      }
    },
    "business": {
      "product": null,
      "growth": null,
      "revenue": null,
      "pmf": null,
      "publicPerception": null,
      "customers": null
    },
    "brief": null,
    "decisionMakers": [],
    "outreach": {
      "status": null,
      "message": null,
      "channel": null,
      "link": null
    },
    "openRoles": {
      "atLeast": 0,
      "exact": false
    },
    "evidence": [
      {
        "id": "iztri-ev-1",
        "category": "Team",
        "observation": "Team composition recorded: Business Development 5, Information Technology 3, Administrative 2, Sales 2, Engineering 2",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Needs verification"
      },
      {
        "id": "iztri-ev-2",
        "category": "Funding",
        "observation": "Pre-Seed: ₹1.5 crore (~$180K) (Total: ~$245K / ₹2 crore)",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "iztri-ev-3",
        "category": "Qualification",
        "observation": "Gate 0 recorded as “pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "iztri-ev-4",
        "category": "Qualification",
        "observation": "Gate 1 recorded as “Fail, Engg Density”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      }
    ]
  },
  {
    "id": "unmannd",
    "slNo": 22,
    "name": "Unmannd",
    "foundedYear": 2025,
    "founders": [
      "Yeshwanth Reddy",
      "Hemaditya Prasad"
    ],
    "founderNote": null,
    "location": "Bengaluru, Karnataka, India",
    "funding": {
      "type": "Pre-Seed",
      "amount": "$2 million (₹19.15 crore)",
      "date": "30 Sep 2025",
      "amountRaw": "$2 million (₹19.15 crore) – 30 Sep 2025",
      "investors": [
        "Speciale Invest",
        "Accel"
      ]
    },
    "employees": {
      "reported": 28,
      "range": {
        "min": 11,
        "max": 50,
        "label": "11-50 employees"
      },
      "raw": "11-50 employees, 28"
    },
    "team": [
      {
        "id": "unmannd-team-1",
        "function": "Engineering",
        "count": 11
      },
      {
        "id": "unmannd-team-2",
        "function": "Information Technology",
        "count": 5
      },
      {
        "id": "unmannd-team-3",
        "function": "Operations",
        "count": 5
      },
      {
        "id": "unmannd-team-4",
        "function": "Business Development",
        "count": 4
      },
      {
        "id": "unmannd-team-5",
        "function": "Education",
        "count": 3
      }
    ],
    "engDensity": {
      "raw": "0.3929",
      "value": 0.3929,
      "unitAmbiguous": false
    },
    "taPercent": {
      "raw": "0.0",
      "value": 0.0,
      "unitAmbiguous": false
    },
    "employeeGrowth": null,
    "hiring": {
      "jobs": [
        {
          "id": "unmannd-job-1",
          "index": 1,
          "roles": "8 Jobs",
          "location": null,
          "source": "Linkedin",
          "recency": "3 jobs 6m, 3 jobs 1week, 2 jobs 1m",
          "applicants": "(2 jobs having 40, 6 jobs having 100ppl applied)",
          "status": "still accepting",
          "jdDuplication": null,
          "reposted": null,
          "hiringManager": null,
          "panel": null,
          "jdAnalysis": null
        }
      ],
      "notes": [],
      "columnCounts": {
        "roles": 1,
        "sources": 1,
        "recency": 1,
        "applicants": 1,
        "status": 1
      },
      "externalPartners": [],
      "hiringBadge": {
        "raw": "yes, Akshatha R"
      },
      "urgency": null,
      "jdDuplication": null,
      "reposts": null,
      "hiringManager": null,
      "panel": null,
      "jdAnalysis": null,
      "teamAnalysis": null,
      "applicantCount": null,
      "hiringPain": null
    },
    "hr": {
      "count": null,
      "people": [
        {
          "id": "unmannd-person-1",
          "name": "Akshata R",
          "function": "HR cum TA",
          "linkedin": null
        },
        {
          "id": "unmannd-person-2",
          "name": "Shraddha S",
          "function": "HR",
          "linkedin": null
        }
      ],
      "sourceNote": "1. Akshata R(HR cum TA)\n2. Shraddha S(HR)",
      "statedNone": false
    },
    "ta": {
      "count": null,
      "people": [
        {
          "id": "unmannd-person-1-ta",
          "name": "Akshata R",
          "function": "HR cum TA",
          "linkedin": null
        }
      ],
      "sourceNote": "1. Akshata R(HR cum TA)\n2. Shraddha S(HR)",
      "statedNone": false
    },
    "gates": {
      "gate0": {
        "raw": "pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate1": {
        "raw": "pass",
        "result": "pass",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate2": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate3": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      },
      "gate4": {
        "raw": null,
        "result": "not_evaluated",
        "reason": null,
        "notes": null,
        "evidence": null
      }
    },
    "business": {
      "product": null,
      "growth": null,
      "revenue": null,
      "pmf": null,
      "publicPerception": null,
      "customers": null
    },
    "brief": null,
    "decisionMakers": [],
    "outreach": {
      "status": null,
      "message": null,
      "channel": null,
      "link": null
    },
    "openRoles": {
      "atLeast": 8,
      "exact": false
    },
    "evidence": [
      {
        "id": "unmannd-ev-1",
        "category": "Hiring",
        "observation": "8 Jobs — Applicants: (2 jobs having 40, 6 jobs having 100ppl applied); Listing: still accepting",
        "source": "Linkedin",
        "sourceUrl": null,
        "recency": "3 jobs 6m, 3 jobs 1week, 2 jobs 1m",
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "unmannd-ev-2",
        "category": "Team",
        "observation": "Team composition recorded: Engineering 11, Information Technology 5, Operations 5, Business Development 4, Education 3",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Needs verification"
      },
      {
        "id": "unmannd-ev-3",
        "category": "Team",
        "observation": "HR / TA coverage: Akshata R (HR cum TA), Shraddha S (HR)",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "unmannd-ev-4",
        "category": "Hiring",
        "observation": "LinkedIn hiring badge: yes, Akshatha R",
        "source": "LinkedIn",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "unmannd-ev-5",
        "category": "Funding",
        "observation": "Pre-Seed: $2 million (₹19.15 crore)",
        "source": null,
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "unmannd-ev-6",
        "category": "Qualification",
        "observation": "Gate 0 recorded as “pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      },
      {
        "id": "unmannd-ev-7",
        "category": "Qualification",
        "observation": "Gate 1 recorded as “pass”",
        "source": "Ratch research (sheet 108)",
        "sourceUrl": null,
        "recency": null,
        "dateChecked": null,
        "notes": null,
        "confidence": null,
        "status": "Observed"
      }
    ]
  }
];

export default companies;
