import { podcastTestData, adCampaignTestData } from './data.test.js'
import adPlatformer from './adPlatformer.js'

let argPodcasts = process.argv[2]
let argAdCampaigns = process.argv[3]

if(argPodcasts) {
  try {
    argPodcasts = JSON.parse(argPodcasts)
  } catch(error) {
    console.error('Error with argument 1 (Podcasts) You must pass in data in valid JSON format')
    console.error(error)

    console.warn('Using default podcast information')
    argPodcasts = podcastTestData
  }
}

if(argAdCampaigns) {
  try {
    argAdCampaigns = JSON.parse(argAdCampaigns)
  } catch(error) {
    console.error('Error with argument 2 (Ad Campaigns) You must pass in data in valid JSON format')
    console.error(error)

    console.warn('Using default ad campaign information')
    argAdCampaigns = adCampaignTestData
  }
}


adPlatformer(argPodcasts || podcastTestData, argAdCampaigns || adCampaignTestData)
