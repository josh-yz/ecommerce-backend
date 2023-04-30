export interface IJwt {
  token: (value: string, role?: string) => Promise<string>
  checkin: (token: string, seed?: any) => Promise<string>
}
