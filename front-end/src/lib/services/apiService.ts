import { API_CONFIG } from '../constants/api';
import type { TripData } from '../../contexts/TripContext';

export interface TravelFormData {
  destination: string;
  group: string;
  month: string;
  days: string;
  budget: string;
  nationality: string;
  rhythm: string;
  activities: string[];
}

export class ApiService {
  private static baseUrl = API_CONFIG.BASE_URL;

  static async generateTrip(formData: TravelFormData): Promise<TripData> {
    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.GENERATE_TRIP}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination: formData.destination,
          group: formData.group,
          month: formData.month,
          days: formData.days,
          budget: formData.budget,
          nationality: formData.nationality,
          rhythm: formData.rhythm,
          activities: formData.activities.join(', '),
          lat: "",
          lon: ""
        }),
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Validate the response structure
      if (!this.validateTripData(data)) {
        throw new Error('Invalid response format from API');
      }

      return data as TripData;
    } catch (error) {
      console.error('Error generating trip:', error);
      
      // Return mock data if API fails (for development/demo purposes)
      // if (process.env.NODE_ENV === 'development') {
      //   console.warn('API failed, returning mock data for development');
      //   return this.getMockTripData(formData);
      // }
      
      throw error;
    }
  }

  private static validateTripData(data: any): boolean {
    const requiredFields = [
      'destination',
      'bag',
      'climate',
      'culinary',
      'emergency',
      'history',
      'itinerary',
      'quick',
      'transportation',
      'visa',
      'warnings'
    ];

    return requiredFields.every(field => data.hasOwnProperty(field));
  }

  private static getMockTripData(formData: TravelFormData): TripData {
    return {
      destination: 'Generated Country',
      history: [
        `The history of ${formData.destination} is rich and diverse, shaped by various cultures and events over centuries. From ancient civilizations to modern developments, the country has a unique story that reflects its heritage and evolution.`
      ],
      itinerary: [
        `**Day 1: Arrival and Exploration**\n\n- **Morning:**\n  - Arrive at ${formData.destination}\n  - Check into accommodation\n  - Initial city orientation\n\n- **Afternoon:**\n  - Visit main city center\n  - Explore local markets\n  - Try local cuisine\n\n- **Evening:**\n  - Welcome dinner at traditional restaurant\n  - Evening stroll through historic district`
      ],
      culinary: [
        `The local cuisine of ${formData.destination} offers a rich blend of traditional flavors and modern gastronomy. The region is known for its fresh ingredients and unique cooking techniques that have been passed down through generations.`,
        "**Local Specialties:**\n- Traditional main dishes featuring local ingredients\n- Seasonal vegetables and fruits\n- Regional beverages and desserts\n- Street food favorites"
      ],
      transportation: [
        `Transportation in ${formData.destination} includes various options for ${formData.group} travelers:\n\n**Public Transportation:**\n- Local buses and trains\n- Metro/subway systems where available\n- Bike sharing programs\n\n**Private Options:**\n- Taxi services\n- Ride-sharing apps\n- Car rental services\n\n**Tourist-Friendly Options:**\n- Hop-on hop-off buses\n- Walking tours\n- Organized transport for day trips`
      ],
      visa: [
        `Visa requirements for ${formData.nationality} citizens visiting ${formData.destination}:\n\n- Check passport validity (minimum 6 months)\n- Verify visa requirements based on nationality\n- Consider travel insurance requirements\n- Keep copies of important documents\n\nNote: Requirements may change, always check with official sources before travel.`
      ],
      warnings: [
        `**Safety Considerations for ${formData.destination}:**\n- Be aware of local customs and cultural norms\n- Keep valuables secure and avoid displaying expensive items\n- Use reputable transportation services\n- Stay informed about local weather conditions`,
        `**Health and Safety:**\n- Check vaccination requirements\n- Bring necessary medications\n- Know emergency contact numbers\n- Register with your embassy if recommended`
      ],
      climate: [
        `Climate in ${formData.month} for ${formData.destination}:\n\nThe weather during your ${formData.days}-day trip is expected to be suitable for ${formData.activities.join(' and ')} activities. Pack accordingly for the season and planned activities.`
      ],
      emergency: [
        `**Emergency Contacts for ${formData.destination}:**\n\n1. **Police:** Local emergency number\n2. **Medical Emergency:** Local ambulance service\n3. **Fire Department:** Local fire emergency\n\n**Embassy/Consulate Information:**\n- Contact details for ${formData.nationality} embassy or consulate\n- 24-hour emergency hotlines\n- Local hospital recommendations`
      ],
      bag: [
        `**Packing List for ${formData.days}-day ${formData.rhythm} trip:**\n\n**Clothing:**\n- Weather-appropriate clothing for ${formData.month}\n- Comfortable walking shoes\n- Activity-specific gear for ${formData.activities.join(', ')}\n\n**Essentials:**\n- Travel documents and copies\n- Personal medications\n- Universal power adapter\n- Travel insurance documents`
      ],
      quick: [
        "Local Language",
        "Local Currency", 
        formData.destination,
        "Local Time Zone"
      ]
    };
  }
}
