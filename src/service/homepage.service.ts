import { getPublishedProjects } from "../service/project.service";
import { getPublishedInsights } from "../service/insight.service";
import { getPublishedOfferings } from "../service/offeringIndividaual.service";
import { getPublishedPackages } from "../service/offeringIPackage.service";

import { ProjectInterface } from "../interface/project";
import { OfferingIndividualInterface } from "../interface/offeringIndividual";
import { OfferingPackageInterface } from "../interface/offeringPackage";
import { InsightInterface } from "../interface/insight";

export interface HomepageData {
  projects: ProjectInterface[];
  services: OfferingIndividualInterface[];
  packages: OfferingPackageInterface[];
  insights: InsightInterface[];
}

export const getHomepageData = async (): Promise<HomepageData> => {

  const [
    projects,
    services,
    packages,
    insights
  ] = await Promise.all([
    getPublishedProjects(),
    getPublishedOfferings(),
    getPublishedPackages(),
    getPublishedInsights()
  ]);

  return {
    projects: projects.slice(0, 4),
    services: services.slice(0, 6),
    packages: packages.slice(0, 4),
    insights: insights.slice(0, 4),
  };
};