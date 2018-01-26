// keyall the campaigns by ID, with some extra statistics (total revenue, slot counts, etc)
const mapAdsById = (adCampaigns) => {
  const adMap = {}
  adCampaigns.forEach((campaign) => {
    // find the campaign's matching regex
    const targetPattern = campaign.map(c => `\\[${c.type}\\]`).join('.*')
    const spotCounts = { PRE: 0, MID: 0, POST: 0 }
    let totalRevenue = 0

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

    campaign[0].targets.forEach((target) => {
      let targetCollection = adMap[target]
      if(!targetCollection) {
        adMap[target] = targetCollection = []
      }

      targetCollection.push(campaignSummary)
    })
  })

  Object.keys(adMap).forEach((podKey) => {
    adMap[podKey].sort((a, b) => b.totalRevenue - a.totalRevenue)
  })

  return adMap
}

const adPlatformer = (podcast, adCampaigns) => {
  const adMap = mapAdsById(adCampaigns)
  let podAudio = podcast.audio

  let podCampaigns = adMap[podcast.id] || []

  podCampaigns.forEach((campaignSummary) => {
    if(podAudio.match(campaignSummary.targetPattern)) {
      campaignSummary.campaign.forEach((ad) => {
        podAudio = podAudio.replace(`[${ad.type}]`, ad.audio)
      })
    }
  })

  podAudio = podAudio.replace(/\[[MIDPREOST]{3,4}\]/g, '')

  return podAudio
}

export default adPlatformer
