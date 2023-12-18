import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SigninValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";

const SigninForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const naviage = useNavigate();

  const { mutateAsync: signInAccount, isPending } = useSignInAccount();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2.submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({ title: "로그인 실패했습니다 다시 시도해주세요" });
    }

    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      naviage("/");
    } else {
      toast({ title: "로그인 실패했습니다 다시 시도해주세요" });
    }
  }

  return (
    <Form {...form}>
      <div className="flex-col flex-center sm:w-420">
        <img src="/assets/images/logo.svg" alt="logo" className="" />
        <h2 className="pt-5 h3-bold md:h2-bold sm:pt-12">로그인</h2>
        <p className="mt-2 text-light-3 small-medium md:base-regular">
          enter your details
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-5 mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="gap-2 flex-center">
                <Loader /> Loading...
              </div>
            ) : (
              "로그인"
            )}
          </Button>
          <p className="text-center text-small text-light-2">
            이미 계정이 있으신가요?
            <Link
              to="/sign-up"
              className="ml-1 text-sm font-bold text-primary-500 text-primary"
            >
              회원가입
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
