import { useState, useEffect } from 'react';
import axios from 'axios';

const GetImage = (item: any, accessToken: string, labplans: any[]) => {
  const [apiData, setApiData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (labplans && labplans.length > 0 && item) {
        const firstLabPlan = labplans[0];
        const params = {
          imageName: item.identifier,
          subscriptionId: firstLabPlan.id.parent.parent.name,
          resourceGroupName: firstLabPlan.id.parent.name,
          labPlanName: firstLabPlan.id.name,
        };

        try {
          const response = await axios.get("https://labsauto20230330224718.azurewebsites.net/api/test3", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            params: params,
          });

          setApiData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    if (accessToken) {
      fetchData();
    }
  }, [item, item?.identifier, accessToken, labplans]);

  return apiData;
};

export default GetImage;
