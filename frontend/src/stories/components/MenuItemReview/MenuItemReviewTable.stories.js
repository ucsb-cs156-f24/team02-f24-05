import React from "react";
import MenuItemReivewTable from "main/components/MenuItemReview/MenuItemReviewTable";
import { menuItemReviewFixtures } from "fixtures/menuItemReviewFixtures";
import { currentUserFixtures } from "fixtures/currentUserFixtures";
import { http, HttpResponse } from "msw";

export default {
  title: "components/MenuItemReview/MenuItemReviewTable",
  component: MenuItemReivewTable,
};

const Template = (args) => {
  return <MenuItemReivewTable {...args} />;
};

export const Empty = Template.bind({});

Empty.args = {
  dates: [],
};

export const ThreeItemsOrdinaryUser = Template.bind({});

ThreeItemsOrdinaryUser.args = {
  dates: menuItemReviewFixtures.threeReviews,
  currentUser: currentUserFixtures.userOnly,
};

export const ThreeItemsAdminUser = Template.bind({});
ThreeItemsAdminUser.args = {
  dates: menuItemReviewFixtures.threeReviews,
  currentUser: currentUserFixtures.adminUser,
};

ThreeItemsAdminUser.parameters = {
  msw: [
    http.delete("/api/menu_item_review", () => {
      return HttpResponse.json({}, { status: 200 });
    }),
  ],
};
