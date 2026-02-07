import { NextRequest, NextResponse } from "next/server";

const CRUSTDATA_BASE = "https://api.crustdata.com";

const MOCK_RESULTS = [
  {
    company_name: "Ahmad HVAC Services LLC",
    company_id: "cd_4821",
    description: "Leading HVAC maintenance and installation provider serving residential and commercial properties across Dubai and Abu Dhabi.",
    linkedin_company_url: "https://www.linkedin.com/company/ahmad-hvac",
    website: "https://ahmad-hvac.ae",
    industry: "Facilities Services",
    founded_year: 2015,
    location: "Al Barsha, Dubai, UAE",
    headquarters: { country: "United Arab Emirates", city: "Dubai", line1: "Al Barsha South, Dubai" },
    employee_count: 48,
    employee_count_range: "11-50",
    specialties: ["HVAC Installation", "AC Repair", "Duct Cleaning", "Central Cooling"],
    employee_growth_percentages: [{ timespan: "YEAR", percentage: 12 }],
    rating: 4.8,
    jobs_completed: 234,
    avg_response_time: "45 min",
    distance_km: 2.1,
    available: true,
  },
  {
    company_name: "Dubai Cool Air Technical Services",
    company_id: "cd_5102",
    description: "Full-service air conditioning and refrigeration company with 24/7 emergency support.",
    linkedin_company_url: "https://www.linkedin.com/company/dubai-cool-air",
    website: "https://dubaicoolair.com",
    industry: "Facilities Services",
    founded_year: 2012,
    location: "JBR, Dubai, UAE",
    headquarters: { country: "United Arab Emirates", city: "Dubai", line1: "JBR Walk, Dubai" },
    employee_count: 72,
    employee_count_range: "51-200",
    specialties: ["HVAC", "Refrigeration", "Chiller Maintenance", "VRF Systems"],
    employee_growth_percentages: [{ timespan: "YEAR", percentage: 8 }],
    rating: 4.6,
    jobs_completed: 189,
    avg_response_time: "1.5 hrs",
    distance_km: 8.3,
    available: true,
  },
  {
    company_name: "FastFix Technical Solutions",
    company_id: "cd_3987",
    description: "Multi-trade technical services covering HVAC, plumbing, and electrical for high-rise buildings.",
    linkedin_company_url: "https://www.linkedin.com/company/fastfix-uae",
    website: "https://fastfix.ae",
    industry: "Facilities Services",
    founded_year: 2018,
    location: "Downtown Dubai, UAE",
    headquarters: { country: "United Arab Emirates", city: "Dubai", line1: "Downtown, Dubai" },
    employee_count: 35,
    employee_count_range: "11-50",
    specialties: ["HVAC Repair", "Plumbing", "Electrical", "Annual Maintenance"],
    employee_growth_percentages: [{ timespan: "YEAR", percentage: -3 }],
    rating: 4.4,
    jobs_completed: 156,
    avg_response_time: "2 hrs",
    distance_km: 12.5,
    available: false,
  },
  {
    company_name: "CoolPro Building Services",
    company_id: "cd_6234",
    description: "Premium HVAC and facilities management company serving luxury developments in Dubai Marina and Palm Jumeirah.",
    linkedin_company_url: "https://www.linkedin.com/company/coolpro-uae",
    website: "https://coolpro.ae",
    industry: "Facilities Services",
    founded_year: 2014,
    location: "Dubai Marina, UAE",
    headquarters: { country: "United Arab Emirates", city: "Dubai", line1: "Marina Walk, Dubai" },
    employee_count: 95,
    employee_count_range: "51-200",
    specialties: ["Central AC", "Chiller Systems", "Building Management", "Energy Audits"],
    employee_growth_percentages: [{ timespan: "YEAR", percentage: 15 }],
    rating: 4.7,
    jobs_completed: 298,
    avg_response_time: "1 hr",
    distance_km: 9.8,
    available: true,
  },
  {
    company_name: "AC Masters UAE",
    company_id: "cd_5567",
    description: "Specialized AC repair and maintenance provider with DED-licensed technicians across all Dubai districts.",
    linkedin_company_url: "https://www.linkedin.com/company/ac-masters-uae",
    website: "https://acmasters.ae",
    industry: "Facilities Services",
    founded_year: 2016,
    location: "Al Barsha, Dubai, UAE",
    headquarters: { country: "United Arab Emirates", city: "Dubai", line1: "Al Barsha 1, Dubai" },
    employee_count: 28,
    employee_count_range: "11-50",
    specialties: ["Split AC Repair", "Window AC", "Central AC Maintenance"],
    employee_growth_percentages: [{ timespan: "YEAR", percentage: 5 }],
    rating: 4.5,
    jobs_completed: 201,
    avg_response_time: "1.2 hrs",
    distance_km: 3.2,
    available: true,
  },
  {
    company_name: "GulfStar Plumbing & Technical",
    company_id: "cd_7891",
    description: "Comprehensive plumbing and water systems provider for commercial and residential properties.",
    linkedin_company_url: "https://www.linkedin.com/company/gulfstar-plumbing",
    website: "https://gulfstarplumbing.ae",
    industry: "Facilities Services",
    founded_year: 2013,
    location: "Deira, Dubai, UAE",
    headquarters: { country: "United Arab Emirates", city: "Dubai", line1: "Deira, Dubai" },
    employee_count: 62,
    employee_count_range: "51-200",
    specialties: ["Plumbing Repair", "Water Heater", "Drainage", "Pipe Fitting"],
    employee_growth_percentages: [{ timespan: "YEAR", percentage: 7 }],
    rating: 4.3,
    jobs_completed: 312,
    avg_response_time: "1 hr",
    distance_km: 15.4,
    available: true,
  },
];

const SPECIALTY_KEYWORDS: Record<string, string[]> = {
  HVAC: ["hvac", "air conditioning", "ac ", "cooling", "central ac", "chiller", "ventilation", "vrf"],
  Plumbing: ["plumbing", "drainage", "water", "pipe", "sanitary"],
  Electrical: ["electrical", "lighting", "power", "wiring", "mep"],
  "General Maintenance": ["maintenance", "technical services", "hard services", "mep", "facility management", "facilities management"],
  Painting: ["painting", "coating", "finishing", "civil", "fit-out", "fitout"],
  Carpentry: ["carpentry", "woodwork", "joinery", "fit-out", "fitout", "civil"],
};

function matchesSpecialty(company: { specialties?: string[]; description?: string }, specialty: string): boolean {
  const keywords = SPECIALTY_KEYWORDS[specialty] || [specialty.toLowerCase()];
  const specs = (company.specialties || []).map((s: string) => s.toLowerCase());
  const desc = (company.description || "").toLowerCase();

  return keywords.some((kw) => specs.some((s) => s.includes(kw)) || desc.includes(kw));
}

function scoreCompany(company: { employee_count?: number; specialties?: string[]; description?: string }, specialty: string): number {
  let score = 0;
  const keywords = SPECIALTY_KEYWORDS[specialty] || [specialty.toLowerCase()];
  const specs = (company.specialties || []).map((s: string) => s.toLowerCase());

  keywords.forEach((kw) => {
    specs.forEach((s) => { if (s.includes(kw)) score += 10; });
  });

  if (company.employee_count) {
    if (company.employee_count >= 1000) score += 5;
    else if (company.employee_count >= 100) score += 3;
    else score += 1;
  }

  return score;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { specialty, region } = body;

  const apiKey = process.env.CRUSTDATA_API_KEY;

  if (apiKey) {
    try {
      const filters = [
        { filter_type: "REGION", type: "in", value: [region || "United Arab Emirates"] },
        { filter_type: "INDUSTRY", type: "in", value: ["Facilities Services"] },
      ];

      const res = await fetch(`${CRUSTDATA_BASE}/screener/company/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ filters, page: 1 }),
      });

      if (res.ok) {
        const data = await res.json();
        const all = (data.companies || []).map((c: Record<string, unknown>) => ({
          company_name: c.name || c.company_name,
          company_id: c.linkedin_company_id || "—",
          description: c.description as string,
          linkedin_company_url: c.linkedin_company_url,
          website: c.website,
          industry: c.industry,
          founded_year: c.founded_year,
          location: c.location,
          headquarters: c.headquarters,
          employee_count: c.employee_count as number,
          employee_count_range: c.employee_count_range,
          specialties: (c.specialties || []) as string[],
          employee_growth_percentages: c.employee_growth_percentages || [],
          revenue_range: c.revenue_range,
          logo_url: (c.logo_urls as Record<string, string>)?.["100x100"],
        }));

        const filtered = specialty
          ? all.filter((c: { specialties?: string[]; description?: string }) => matchesSpecialty(c, specialty))
          : all;

        const sorted = filtered.sort(
          (a: { employee_count?: number; specialties?: string[]; description?: string }, b: { employee_count?: number; specialties?: string[]; description?: string }) =>
            scoreCompany(b, specialty || "") - scoreCompany(a, specialty || "")
        );

        return NextResponse.json({
          source: "crustdata_live",
          companies: sorted.slice(0, 15),
          total: filtered.length,
          request: { endpoint: `${CRUSTDATA_BASE}/screener/company/search`, method: "POST", filters },
        });
      }
    } catch {
      // fallthrough to mock
    }
  }

  let filtered = MOCK_RESULTS;
  if (specialty) {
    filtered = filtered.filter((c) => matchesSpecialty(c, specialty));
  }

  return NextResponse.json({
    source: "mock",
    companies: filtered,
    total: filtered.length,
    request: {
      endpoint: `${CRUSTDATA_BASE}/screener/company/search`,
      method: "POST",
      filters: [
        { filter_type: "REGION", type: "in", value: ["United Arab Emirates"] },
        { filter_type: "INDUSTRY", type: "in", value: ["Facilities Services"] },
      ],
    },
  });
}
