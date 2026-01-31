import { Routes } from "@nestjs/core";
import { articlesRoutes } from "src/domains/user/v1/articles/articles.routes";
import { bannersRoutes } from "src/domains/user/v1/banners/banners.routes";
import { chatbotRoutes } from "src/domains/user/v1/chatbot/chatbot.routes";
import { highlightsRoutes } from "src/domains/user/v1/highlights/highlights.routes";
import { pagesRoutes } from "src/domains/user/v1/pages/pages.routes";
import { placesRoutes } from "src/domains/user/v1/places/places.routes";
import { searchRoutes } from "src/domains/user/v1/search/search.routes";
import { solutionsRoutes } from "src/domains/user/v1/solutions/solutions.routes";
import { updatesRoutes } from "src/domains/user/v1/updates/updates.routes";

export const v1UserRoutes: Routes = [
  {
    path: '/user-api/v1',
    children: [
      ...placesRoutes,
      ...articlesRoutes,
      ...solutionsRoutes,
      ...bannersRoutes,
      ...updatesRoutes,
      ...pagesRoutes,
      ...highlightsRoutes,
      ...searchRoutes,
      ...chatbotRoutes
    ],
  },
];