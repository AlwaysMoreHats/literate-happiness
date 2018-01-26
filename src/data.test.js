export const podcastTestData = [
  { id: "dag-892", audio: "++++[MID]++++[MID]++++[POST]" },
  { id: "abc-123", audio: "[PRE]++++[MID]++++[MID]++[MID]++[POST]" },
  { id: "hab-812", audio: "[PRE][PRE]++++[MID]++++[MID]++[MID]++[POST]" },
  { id: "efa-931", audio: "[PRE][PRE]++++++++++" },
  { id: "paj-103", audio: "++++[MID]+++++[MID]++++[MID]++[POST]" }
]

export const adCampaignTestData = [
  [
    { audio: "*AcmeA*", type: "PRE", targets: ["dag-892", "hab-812"], revenue: 1 },
    { audio: "*AcmeB*", type: "MID", targets: ["dag-892", "hab-812"], revenue: 4 },
    { audio: "*AcmeC*", type: "MID", targets: ["dag-892", "hab-812"], revenue: 5 }
  ], [
    { audio: "*TacoCat*", type: "MID", targets: ["abc-123", "dag-892"], revenue: 3 }
  ], [
    { audio: "*CorpCorpA*", type: "PRE", targets: ["abc-123", "dag-892"], revenue: 11 },
    { audio: "*CorpCorpB*", type: "POST", targets: ["abc-123", "dag-892"], revenue: 7 }
  ], [
    { audio: "*FurryDogA*", type: "PRE", targets: ["dag-892", "hab-812", "efa-931"], revenue: 11 },
    { audio: "*FurryDogB*", type: "PRE", targets: ["dag-892", "hab-812", "efa-931"], revenue: 7 }
  ], [
    { audio: "*GiantGiraffeA*", type: "MID", targets: ["paj-103", "abc-123"], revenue: 9 },
    { audio: "*GiantGiraffeB*", type: "MID", targets: ["paj-103", "abc-123"], revenue: 4 }
  ]
]
