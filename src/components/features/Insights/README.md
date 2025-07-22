# Forest Insights Visualization Components

This directory contains three main visualization components for displaying forest statistics and biodiversity data.

## Components

### 1. StatisticsPanel
**Purpose**: Displays key forest metrics and comprehensive overview statistics.

**Features**:
- Key metrics grid with icons, values, and trends
- Detailed overview of protected areas, forest coverage, and environmental impact
- Responsive design with hover effects
- Uses data from `forestStatistics.js`

**Data Sources**:
- `forestStatistics.overview` - Overall forest statistics
- `forestStatistics.keyMetrics` - Key performance indicators

### 2. BiodiversityChart
**Purpose**: Interactive data visualization using Recharts library.

**Features**:
- Four different chart types:
  - Forest Types Distribution (Bar Chart)
  - State-wise Forest Cover (Bar Chart)
  - Biodiversity Hotspots (Line Chart with Bar)
  - Threatened Species (Pie Chart)
- Interactive chart selection buttons
- Responsive design with tooltips and legends
- Chart descriptions for educational context

**Data Sources**:
- `forestStatistics.forestTypes` - Forest type distribution
- `forestStatistics.stateWiseForestCover` - State forest data
- `forestStatistics.biodiversityHotspots` - Hotspot information
- `speciesData.threatenedSpecies` - Conservation status data

### 3. InteractiveMap
**Purpose**: Interactive map showing forest region distribution using Leaflet.

**Features**:
- Interactive map of India with forest regions
- Filter controls for different region types
- Color-coded markers based on ecosystem type
- Size-based markers representing area coverage
- Detailed popups with region information
- Selected region details panel
- Legend for marker interpretation
- SSR-safe implementation with dynamic imports

**Data Sources**:
- `forestRegions.majorRegions` - Detailed region information

## Usage

```javascript
import { StatisticsPanel, BiodiversityChart, InteractiveMap } from '../components/features/Insights';

// Use in your page component
<StatisticsPanel />
<BiodiversityChart />
<InteractiveMap />
```

## Dependencies

- **Recharts**: For chart visualizations
- **React-Leaflet**: For interactive maps
- **Leaflet**: Map library
- **Next.js**: For dynamic imports and SSR handling

## Styling

All components use Tailwind CSS for styling with:
- Consistent green color scheme
- Responsive design patterns
- Hover effects and transitions
- Shadow and border styling

## Data Requirements

Components expect data in specific formats as defined in:
- `src/data/insights/forestStatistics.js`
- `src/data/insights/speciesData.js`
- `src/data/insights/forestRegions.js`

## Browser Compatibility

- Modern browsers with ES6+ support
- Map component requires JavaScript enabled
- Responsive design for mobile and desktop