/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be... included in all copies or substantial portions of the Software.

*/

// @mui material components
import Grid from "@mui/material/Grid";
import { Card, Stack } from "@mui/material";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// React icons
import { IoGlobe, IoBuild, IoWallet, IoDocumentText } from "react-icons/io5";

// Charts
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";

function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;

  // -----------------------------
  // Nutrition data (top 5 items)
  // -----------------------------
  const popularItems = [
    {
      name: "Burrito bowl",
      country: "United States",
      calories: 267,
      protein: 13.28,
      fat: 10.68,
      carbs: 28.33,
      fiber: 2.0,
      satFat: null,
      transFat: null,
      cholesterol: null,
    },
    {
      name: "French fries",
      country: "United States",
      calories: 312,
      protein: 3.43,
      fat: 14.73,
      carbs: 41.44,
      fiber: 3.8,
      satFat: null,
      transFat: null,
      cholesterol: null,
    },
    {
      name: "Chicken nuggets",
      country: "United States",
      calories: 307,
      protein: 15.92,
      fat: 20.36,
      carbs: 14.93,
      fiber: 0.9,
      satFat: null,
      transFat: null,
      cholesterol: null,
    },
    {
      name: "Chicken sandwich",
      country: "United States",
      calories: 281,
      protein: 12.17,
      fat: 13.46,
      carbs: 27.48,
      fiber: 1.7,
      satFat: null,
      transFat: null,
      cholesterol: null,
    },
    {
      name: "Waffle fries",
      country: "United States",
      calories: 167,
      protein: 2.38,
      fat: 7.14,
      carbs: 23.8,
      fiber: 2.4,
      satFat: 2.38,
      transFat: 0.0,
      cholesterol: 0.0,
    },
  ];

  const numberOfItems = popularItems.length;

  const avgCalories =
    popularItems.reduce((sum, item) => sum + item.calories, 0) / numberOfItems;
  const avgFat =
    popularItems.reduce((sum, item) => sum + item.fat, 0) / numberOfItems;
  const avgCarbs =
    popularItems.reduce((sum, item) => sum + item.carbs, 0) / numberOfItems;
  const avgFiber =
    popularItems.reduce((sum, item) => sum + item.fiber, 0) / numberOfItems;

  const avgProtein =
    popularItems.reduce((sum, item) => sum + item.protein, 0) / numberOfItems;
  const totalMacros = avgProtein + avgFat + avgCarbs;
  const proteinPct = (avgProtein / totalMacros) * 100;
  const fatPct = (avgFat / totalMacros) * 100;
  const carbsPct = (avgCarbs / totalMacros) * 100;

  // Bar chart: calories per popular item
  const barChartDataCalories = [
    {
      name: "Calories",
      data: popularItems.map((item) => item.calories),
    },
  ];

  const barChartOptionsCalories = {
    ...barChartOptionsDashboard,
    xaxis: {
      ...(barChartOptionsDashboard.xaxis || {}),
      categories: popularItems.map((item) => item.name),
    },
    yaxis: {
      ...(barChartOptionsDashboard.yaxis || {}),
      title: {
        text: "Calories per serving",
      },
    },
  };

  // Line chart: macro grams per item
  const lineChartDataMacros = [
    {
      name: "Protein (g)",
      data: popularItems.map((item) => Number(item.protein.toFixed(2))),
    },
    {
      name: "Total fat (g)",
      data: popularItems.map((item) => Number(item.fat.toFixed(2))),
    },
    {
      name: "Carbohydrates (g)",
      data: popularItems.map((item) => Number(item.carbs.toFixed(2))),
    },
  ];

  const lineChartOptionsMacros = {
    ...lineChartOptionsDashboard,
    xaxis: {
      ...(lineChartOptionsDashboard.xaxis || {}),
      categories: popularItems.map((item) => item.name),
    },
    yaxis: {
      ...(lineChartOptionsDashboard.yaxis || {}),
      title: {
        text: "Grams per serving",
      },
    },
  };

  const formatNumber = (value, decimals = 1) =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        {/* Top stats cards */}
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "avg calories / item", fontWeight: "regular" }}
                count={`${formatNumber(avgCalories, 0)} kcal`}
                percentage={{
                  color: "success",
                  text: "Top 5 most ordered items (US, 2024)",
                }}
                icon={{
                  color: "info",
                  component: <IoWallet size="22px" color="white" />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "avg total fat", fontWeight: "regular" }}
                count={`${formatNumber(avgFat)} g`}
                percentage={{ color: "info", text: "per serving" }}
                icon={{
                  color: "info",
                  component: <IoBuild size="22px" color="white" />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "avg carbohydrates", fontWeight: "regular" }}
                count={`${formatNumber(avgCarbs)} g`}
                percentage={{ color: "info", text: "per serving" }}
                icon={{
                  color: "info",
                  component: <IoGlobe size="22px" color="white" />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "avg fiber", fontWeight: "regular" }}
                count={`${formatNumber(avgFiber)} g`}
                percentage={{ color: "success", text: "per serving" }}
                icon={{
                  color: "info",
                  component: <IoDocumentText size="22px" color="white" />,
                }}
              />
            </Grid>
          </Grid>
        </VuiBox>

        {/* Charts row */}
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7} xl={7}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography
                    variant="lg"
                    color="white"
                    fontWeight="bold"
                    mb="5px"
                  >
                    Calories per popular item
                  </VuiTypography>
                  <VuiTypography
                    variant="button"
                    color="text"
                    fontWeight="regular"
                    mb="24px"
                  >
                    Based on the 2024 Uber Eats most ordered items in the U.S.
                  </VuiTypography>
                  <VuiBox sx={{ height: "310px" }}>
                    <BarChart
                      barChartData={barChartDataCalories}
                      barChartOptions={barChartOptionsCalories}
                    />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} lg={5} xl={5}>
              <Card sx={{ height: "100%" }}>
                <VuiBox
                  sx={{
                    height: "100%",
                    background: linearGradient(
                      cardContent.main,
                      cardContent.state,
                      cardContent.deg
                    ),
                    borderRadius: "15px",
                    padding: "20px",
                  }}
                >
                  <VuiTypography
                    color="white"
                    variant="lg"
                    fontWeight="bold"
                    mb="6px"
                  >
                    Average macronutrient split
                  </VuiTypography>
                  <VuiTypography
                    color="text"
                    variant="button"
                    fontWeight="regular"
                    mb="24px"
                  >
                    Share of calories coming from protein, fat, and
                    carbohydrates across the top 5 items.
                  </VuiTypography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <Stack spacing={2}>
                        <VuiBox>
                          <VuiBox
                            display="flex"
                            justifyContent="space-between"
                            mb="4px"
                          >
                            <VuiTypography
                              color="text"
                              variant="button"
                              fontWeight="medium"
                            >
                              Carbohydrates
                            </VuiTypography>
                            <VuiTypography
                              color="white"
                              variant="button"
                              fontWeight="medium"
                            >
                              {formatNumber(carbsPct, 1)}%
                            </VuiTypography>
                          </VuiBox>
                          <VuiProgress
                            value={Math.round(carbsPct)}
                            color="info"
                            sx={{ background: "#2D2E5F" }}
                          />
                        </VuiBox>
                        <VuiBox>
                          <VuiBox
                            display="flex"
                            justifyContent="space-between"
                            mb="4px"
                          >
                            <VuiTypography
                              color="text"
                              variant="button"
                              fontWeight="medium"
                            >
                              Total fat
                            </VuiTypography>
                            <VuiTypography
                              color="white"
                              variant="button"
                              fontWeight="medium"
                            >
                              {formatNumber(fatPct, 1)}%
                            </VuiTypography>
                          </VuiBox>
                          <VuiProgress
                            value={Math.round(fatPct)}
                            color="info"
                            sx={{ background: "#2D2E5F" }}
                          />
                        </VuiBox>
                        <VuiBox>
                          <VuiBox
                            display="flex"
                            justifyContent="space-between"
                            mb="4px"
                          >
                            <VuiTypography
                              color="text"
                              variant="button"
                              fontWeight="medium"
                            >
                              Protein
                            </VuiTypography>
                            <VuiTypography
                              color="white"
                              variant="button"
                              fontWeight="medium"
                            >
                              {formatNumber(proteinPct, 1)}%
                            </VuiTypography>
                          </VuiBox>
                          <VuiProgress
                            value={Math.round(proteinPct)}
                            color="info"
                            sx={{ background: "#2D2E5F" }}
                          />
                        </VuiBox>
                      </Stack>
                    </Grid>
                  </Grid>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>

        {/* Macro line chart */}
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography
                    variant="lg"
                    color="white"
                    fontWeight="bold"
                    mb="5px"
                  >
                    Macronutrients per item
                  </VuiTypography>
                  <VuiTypography
                    variant="button"
                    color="text"
                    fontWeight="regular"
                    mb="24px"
                  >
                    Compare protein, fat, and carbohydrate grams per serving for
                    each popular food.
                  </VuiTypography>
                  <VuiBox sx={{ height: "310px" }}>
                    <LineChart
                      lineChartData={lineChartDataMacros}
                      lineChartOptions={lineChartOptionsMacros}
                    />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>

        {/* Detailed nutrition table */}
        <VuiBox mb={3}>
          <Card>
            <VuiBox p="20px">
              <VuiTypography
                variant="lg"
                color="white"
                fontWeight="bold"
                mb="12px"
              >
                Nutrition details for top items
              </VuiTypography>
              <VuiTypography
                variant="button"
                color="text"
                fontWeight="regular"
                mb="24px"
              >
                All values are per serving. Empty values indicate data not
                available yet.
              </VuiTypography>
              <VuiBox
                component="table"
                width="100%"
                sx={{
                  borderCollapse: "collapse",
                  "& th, & td": {
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    padding: "8px 4px",
                    textAlign: "left",
                  },
                  "& th": {
                    color: "rgba(255, 255, 255, 0.8)",
                    ...typography.caption,
                    fontWeight: 600,
                  },
                }}
              >
                <thead>
                  <tr>
                    <th>Food item</th>
                    <th>Country</th>
                    <th>Calories</th>
                    <th>Protein (g)</th>
                    <th>Total fat (g)</th>
                    <th>Carbs (g)</th>
                    <th>Fiber (g)</th>
                    <th>Sat. fat (g)</th>
                    <th>Trans-fat (g)</th>
                    <th>Cholesterol (mg)</th>
                  </tr>
                </thead>
                <tbody>
                  {popularItems.map((item) => (
                    <tr key={item.name}>
                      <td>
                        <VuiTypography
                          variant="button"
                          color="white"
                          fontWeight="medium"
                        >
                          {item.name}
                        </VuiTypography>
                      </td>
                      <td>
                        <VuiTypography
                          variant="button"
                          color="text"
                          fontWeight="regular"
                        >
                          {item.country}
                        </VuiTypography>
                      </td>
                      <td>{item.calories}</td>
                      <td>{formatNumber(item.protein, 2)}</td>
                      <td>{formatNumber(item.fat, 2)}</td>
                      <td>{formatNumber(item.carbs, 2)}</td>
                      <td>{formatNumber(item.fiber, 1)}</td>
                      <td>
                        {item.satFat != null
                          ? formatNumber(item.satFat, 2)
                          : "-"}
                      </td>
                      <td>
                        {item.transFat != null
                          ? formatNumber(item.transFat, 2)
                          : "-"}
                      </td>
                      <td>
                        {item.cholesterol != null
                          ? formatNumber(item.cholesterol, 0)
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </VuiBox>
            </VuiBox>
          </Card>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
