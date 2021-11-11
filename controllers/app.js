const { response } = require("express");
const { validationResult } = require("express-validator");

const Site = require("../models/site");

exports.getSites = (req, res, next) => {
  Site.findAll({ attributes: ["site_id", "owner", "siteName"] })
    .then((retrievedSites) => {
      const sites = retrievedSites.map((site) => {
        const { site_id, owner, siteName } = site.dataValues;
        return {
          siteId: site_id,
          siteName: siteName,
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
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed, entered data is incorrect.",
      errors: errors.array(),
    });
  }

  const siteDetails = {
    siteName: req.body.siteName,
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
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        err.message = "Somethin wrong happened on the server. Try again later.";
      }
      next(err);
    });
};

exports.updateSite = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed, entered data is incorrect.",
      errors: errors.array(),
    });
  }

  const siteId = req.params.siteId;

  const siteDetails = {
    siteName: req.body.siteName,
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
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        err.message =
          "Something wrong happened on the server. Try again later.";
      }
      next(err);
    });
};

exports.deleteSite = (req, res, next) => {
  const siteId = req.params.siteId;

  Site.findByPk(siteId)
    .then((fetchedSite) => {
      console.log(fetchedSite);
      return fetchedSite.destroy();
    })
    .then((result) => {
      res.status(200).json({ message: "Resource deleted succesfully." });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        err.message =
          "Something wrong happened on the server. Try again later.";
      }
      next(err);
    });
};
