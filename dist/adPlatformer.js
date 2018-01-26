'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// keyall the campaigns by ID, with some extra statistics (total revenue, slot counts, etc)
var mapAdsById = function mapAdsById(adCampaigns) {
  var adMap = {};
  adCampaigns.forEach(function (campaign) {
    // find the campaign's matching regex
    var targetPattern = campaign.map(function (c) {
      return '\\[' + c.type + '\\]';
    }).join('.*');
    var spotCounts = { PRE: 0, MID: 0, POST: 0 };
    var totalRevenue = 0;

    // fill in counts/revenue
    campaign.forEach(function (c) {
      spotCounts[c.type] += 1;
      totalRevenue += c.revenue;
    });

    var campaignSummary = {
      targetPattern: targetPattern,
      spotCounts: spotCounts,
      totalRevenue: totalRevenue,
      campaign: campaign

      // assign the summary by the campaign ID
    };campaign[0].targets.forEach(function (target) {
      var targetCollection = adMap[target];
      if (!targetCollection) {
        adMap[target] = targetCollection = [];
      }

      targetCollection.push(campaignSummary);
    });
  });

  // sort it by total revenue
  Object.keys(adMap).forEach(function (podKey) {
    adMap[podKey].sort(function (a, b) {
      return b.totalRevenue - a.totalRevenue;
    });
  });

  return adMap;
};

var adPlatformer = function adPlatformer(podcast, adCampaigns) {
  var adMap = mapAdsById(adCampaigns);
  var podAudio = podcast.audio;

  // Get all ad campaigns by this podcast's ids
  var podCampaigns = adMap[podcast.id] || [];

  // go through each campaign (which is sorted by total revenue)
  podCampaigns.forEach(function (campaignSummary) {
    // see if the ad slots match (via regex pattern)
    if (podAudio.match(campaignSummary.targetPattern)) {
      // if they do, replace allthe spots with ads
      campaignSummary.campaign.forEach(function (ad) {
        podAudio = podAudio.replace('[' + ad.type + ']', ad.audio);
      });
    }
  });

  podAudio = podAudio.replace(/\[[MIDPREOST]{3,4}\]/g, '');

  return podAudio;
};

exports.default = adPlatformer;