export interface ConfigurationModel {
  id?: number;
  logoUrl: string;
  logoPublicId: string;
  heroUrl: string;
  heroPublicId: string;
  title: string;
  description: string;
  name: string;
  additionalTitle: string;
  additionalDescription: string;
  enableRedirectToIpuc: boolean;
  mission: string;
  vision: string;
  ubicationUrl: string;
  ubicationCoordinates: string;
  enableRedirectToGoogleMaps: boolean;
}
