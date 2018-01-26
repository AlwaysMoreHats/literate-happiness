// keyall the campaigns by ID, with some extra statistics (total revenue, slot counts, etc)
const mapAdsById = (adCampaigns) => {
  const adMap = {}
  adCampaigns.forEach((campaign) => {
    // find the campaign's matching regex
    const targetPattern = campaign.map(c => `\\[${c.type}\\]`).join('.*')
    const spotCounts = { PRE: 0, MID: 0, POST: 0 }
    let totalRevenue = 0

    // fill in counts/revenue
    campaign.forEach((c) => {
      spotCounts[c.type] += 1
      totalRevenue += c.revenue
    })

    const campaignSummary = {
      targetPattern,
      spotCounts,
      totalRevenue,
      campaign
    }

    // assign the summary by the campaign ID
    campaign[0].targets.forEach((target) => {
      let targetCollection = adMap[target]
      if(!targetCollection) {
        adMap[target] = targetCollection = []
      }

      targetCollection.push(campaignSummary)
    })
  })

  // sort it by total revenue
  Object.keys(adMap).forEach((podKey) => {
    adMap[podKey].sort((a, b) => b.totalRevenue - a.totalRevenue)
  })

  return adMap
}

const adPlatformer = (podcast, adCampaigns) => {
  const adMap = mapAdsById(adCampaigns)
  let podAudio = podcast.audio

  // Get all ad campaigns by this podcast's ids
  let podCampaigns = adMap[podcast.id] || []

  let revenue = 0

  // go through each campaign (which is sorted by total revenue)
  podCampaigns.forEach((campaignSummary) => {
    // see if the ad slots match (via regex pattern)
    if(podAudio.match(campaignSummary.targetPattern)) {
      revenue += campaignSummary.totalRevenue
      // if they do, replace allthe spots with ads
      campaignSummary.campaign.forEach((ad) => {
        podAudio = podAudio.replace(`[${ad.type}]`, ad.audio)
      })
    }
  })

  podAudio = podAudio.replace(/\[[MIDPREOST]{3,4}\]/g, '')

  return {
    id: podcast.id,
    audio: podAudio,
    revenue
  }
}

export default adPlatformer
