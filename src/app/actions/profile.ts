export type ProfileActionState = {
  message?: string;
  issues?: string[];
  fields?: any;
};

export const updateProfile = async (
  prevState: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> => {
  "use server";

  const data = Object.fromEntries(formData);
  // const parsed = signInSchema.safeParse(data);
  return {
    message: "Profile updated successfully!",
  };
};
