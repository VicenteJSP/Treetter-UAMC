type DataResponse = Credentials | TreetterObj;
export interface ResponseTreetter {
  data: DataResponse;
  message: string;
  code: number;
  success: boolean;
  type_action: string;
}

export interface Credentials {
  access_token: string;
  username: string;
  role: string;
  method: string;
}

export interface TreetterObj {
  user: string;
  sample: number;
  treemap: Treemap;
  platforms: string[];
}

export interface Treemap {
  name: string;
  picProfile: string;
  verified: boolean;
  children: Array<TreemapNode>;
}

export interface TreemapNode {
  name: string
  children?: Array<TreemapNode>
  color?: string
  value?: number;
  size?: number;
  description?: string;
}
