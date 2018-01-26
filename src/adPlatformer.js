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

const applyAds = (podAudio, podCampaigns) => {
  let mostValuable = {podAudio, revenue: 0} //fake node to start

  const makeLeaf = (podAudio, podCampaigns, currentRevenue) => {
    if(podCampaigns.length === 0) {
      return null
    }

    // go through each campaign (which is sorted by total revenue)
    podCampaigns.forEach((campaignSummary) => {
      // see if the ad slots match (via regex pattern)
      if(podAudio.match(campaignSummary.targetPattern)) {
        let newAudio = podAudio

        // if they do, replace all the spots with ads
        campaignSummary.campaign.forEach((ad) => {
          newAudio = newAudio.replace(`[${ad.type}]`, ad.audio)
        })

        let remainingCampaigns = podCampaigns
          .filter(campaignData => campaignData !== campaignSummary) // filter out this campaign
          .filter(campaignData => newAudio.match(campaignData.targetPattern)) // only include matching

        const revenue = currentRevenue + campaignSummary.totalRevenue

        makeLeaf(newAudio, remainingCampaigns, revenue)

        if(mostValuable.revenue < revenue) {
          mostValuable = {
            podAudio: newAudio,
            revenue,
          }
        }
      }
    })
  }

  // it's arbor day
  makeLeaf(podAudio, podCampaigns, 0)
  return mostValuable
}

const adPlatformer = (podcast, adCampaigns) => {
  const adMap = mapAdsById(adCampaigns)
  let podAudio = podcast.audio

  // Get all ad campaigns by this podcast's ids
  let podCampaigns = adMap[podcast.id] || []

  //filter out all unusable pods
  podCampaigns = podCampaigns.filter(campaignData => podAudio.match(campaignData.targetPattern))

  const mostValuableCast = applyAds(podAudio, podCampaigns)

  podAudio = mostValuableCast.podAudio.replace(/\[[MIDPREOST]{3,4}\]/g, '')

  return {
    id: podcast.id,
    audio: podAudio,
    revenue: mostValuableCast.revenue
  }
}

export default adPlatformer
