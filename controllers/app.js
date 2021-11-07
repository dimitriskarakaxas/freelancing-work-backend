const Site = require("../models/site");

exports.getSites = (req, res, next) => {
  Site.findAll({ attributes: ["site_id", "owner"] })
    .then((retrievedSites) => {
      const sites = retrievedSites.map((site) => {
        const { site_id, owner } = site.dataValues;
        return {
          siteId: site_id,
          owner: owner,
        };
      });
      res.status(200).json(sites);
    })
    .catch((err) => console.log(err));
};

exports.getSiteDetails = (req, res, next) => {
  const siteId = req.params.siteId;

  Site.findByPk(siteId)
    .then((retrievedSiteDetails) => {
      if (!retrievedSiteDetails) {
        next(new Error("There is no Site with this Id."));
      }
      const { site_id, ...otherDetails } = retrievedSiteDetails.dataValues;
      const siteDetails = {
        siteId: site_id,
        ...otherDetails,
      };
      res.status(200).json(siteDetails);
    })
    .catch((err) => console.log(err));
};

exports.createSite = (req, res, next) => {
  const siteDetails = {
    owner: req.body.owner,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    utc: req.body.utc,
    internal: req.body.internal,
    dst: req.body.dst,
    disabled: req.body.disabled,
  };

  Site.create(siteDetails)
    .then((newSite) => {
      console.log(newSite.toJSON());
      res.status(201).json({
        message: "Site created succesfully.",
        siteDetails: newSite,
      });
    })
    .catch((err) => console.log(err));
};

exports.updateSite = (req, res, next) => {
  const siteId = req.params.siteId;

  const siteDetails = {
    owner: req.body.owner,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    utc: req.body.utc,
    internal: req.body.internal,
    dst: req.body.dst,
    disabled: req.body.disabled,
  };

  Site.findByPk(siteId)
    .then((retrievedSite) => {
      retrievedSite.set(siteDetails);
      return retrievedSite.save();
    })
    .then((updatedSite) => {
      res.status(200).json({
        message: "Resource updated succesfully.",
        siteDetails: updatedSite.toJSON(),
      });
    })
    .catch((err) => console.log(err));
};
