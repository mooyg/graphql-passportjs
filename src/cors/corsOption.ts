interface CorsOptions {
  origin: string;
  credentials: boolean;
}

export const corsOptions: CorsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
