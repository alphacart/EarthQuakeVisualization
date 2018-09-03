Visualizing Data with Leaflet

## Background

![1-Logo](Images/1-Logo.png)

The United States Geological Survey is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change.

 Developed a new visualization based on earthquake data to provide a meaningful way of displaying it. 


### Basic Visualization

![2-BasicMap](Images/2-BasicMap.png)

  Basic visualization an earthquake data set.

1. **Get data set**

   ![3-Data](Images/3-Data.png)

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and pick a data set to visualize. When you click on a data set, for example 'All Earthquakes from the Past 7 Days', will be given a JSON representation of that data. Will be using the URL of this JSON to pull in the data for visualization.

   ![4-JSON](Images/4-JSON.png)

2. **Import & Visualize the Data**

   Create a map using Leaflet that plots all of the earthquakes from the data set based on their longitude and latitude.

   * Your data markers should reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes should appear larger and darker in color.

   * Include popups that provide additional information about the earthquake when a marker is clicked.

   * Create a legend that will provide context for your map data.

   * Visualization should look something like the map above.

- - -

### More Data 

![5-Advanced](Images/5-Advanced.png)

 Plot a second data set on map to illustrate the relationship between tectonic plates and seismic activity. Pull in a second data set and visualize it along side of original set of data. Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.

In this step..

* Plot a second data set to map.

* Add a number of base maps to choose from as well as separate out from two different data sets into overlays that can be turned on and off independently.

* Add layer controls to our map.

- - -
