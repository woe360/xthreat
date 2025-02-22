class CampaignState {
  private static instance: CampaignState;
  private data: any = {};

  private constructor() {
    // Load initial data from localStorage if exists
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('campaignData');
      if (saved) {
        this.data = JSON.parse(saved);
      }
    }
  }

  public static getInstance(): CampaignState {
    if (!CampaignState.instance) {
      CampaignState.instance = new CampaignState();
    }
    return CampaignState.instance;
  }

  public updateData(key: string, value: any) {
    this.data[key] = value;
    if (typeof window !== 'undefined') {
      localStorage.setItem('campaignData', JSON.stringify(this.data));
    }
  }

  public getData(key: string) {
    return this.data[key];
  }

  public getAllData() {
    return this.data;
  }

  public clearData() {
    this.data = {};
    if (typeof window !== 'undefined') {
      localStorage.removeItem('campaignData');
    }
  }
}

export default CampaignState; 