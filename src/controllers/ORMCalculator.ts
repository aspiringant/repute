import * as nodemailer from "nodemailer";
import * as googleSearchHelper from "../utils/GoogleSearch";
import GoogleSearchStrategy from "../strategies/GoogleSearchStrategy";
import GoogleTrendsStrategy from "../strategies/GoogleTrendsStrategy";
import { Request, Response } from "express";
import app from "../server";
import FacebookPageStrategy from "../strategies/FacebookPageStrategy";
import GoogleSentimentAnalyzer from "../models/GoogleSentimentAnalyzer";
/**
 * GET /ormform
 * ORM form page.
 */
export let getOrmForm = (req: Request, res: Response) => {
    res.render("ormcalculator", {
      title: "ORM Calculator"
    });
};

export let testGoogle = (req: Request, res: Response) => {
    const g: GoogleSentimentAnalyzer = new GoogleSentimentAnalyzer();
    g.callLanguageApi().then(() => {
        res.end();
    });
};

export let getScore = (req: Request, res: Response) => {
    const redirectLink: string = "/ormcalculator/getormform";
    const errors = validateParams(req);
    if (errors) {
        req.flash("errors", errors);
        return res.redirect(redirectLink);
    }
    const input_params: Object = {
        name: req.body.name,
        url: req.body.url
    };
    const gSearch: GoogleSearchStrategy = new GoogleSearchStrategy(req.body.name);
    gSearch.executeStrategy().then(() => {
        req.flash("success", { msg: "done" });
        res.redirect(redirectLink);
    });
    /*const gTrend: GoogleTrendsStrategy = new GoogleTrendsStrategy(req.body.name);
    gTrend.executeStrategy().then(() => {
        req.flash("success", { msg: "done" });
        res.redirect(redirectLink);
    });*/
    /*if (req.body.fblink) {
        const fbStrategy: FacebookPageStrategy = new FacebookPageStrategy(req.body.fblink);
        fbStrategy.executeStrategy().then(() => {
            req.flash("success", { msg: "done" });
            res.redirect(redirectLink);
        });
    }*/
    // const googRes = googleSearchHelper.callGoogleSearch(req.body.name);
};

const validateParams = (req: Request) => {
    req.assert("name", "Name cannot be blank").notEmpty();
    /*req.assert("url", "Company Url is not valid").isURL();
    req.assert("sector", "Sector cannot be blank").notEmpty();
    req.assert("location", "Location cannot be blank").notEmpty();
    req.assert("fblink", "FB Page Url is not valid").isURL();*/
    const errors = req.validationErrors();
    return errors;
};
