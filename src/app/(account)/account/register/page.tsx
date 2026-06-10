"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("すべての項目を入力してください。");
      return;
    }
    if (password.length < 8) {
      setError("パスワードは8文字以上で設定してください。");
      return;
    }
    if (password !== confirmPassword) {
      setError("パスワードが一致しません。");
      return;
    }

    router.push(`/account/verify-sent?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="container-cafora">
        <h1 className="text-xl font-semibold sm:text-2xl">マイページ</h1>

        <div className="mx-auto mt-10 max-w-md sm:mt-12">
          <h2 className="mt-2 text-base font-medium">アカウント作成</h2>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {error && (
              <p className="border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-wide text-muted-foreground">
                メールアドレス <span className="text-foreground">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-border bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-foreground"
                placeholder="your@email.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-wide text-muted-foreground">
                パスワード <span className="text-foreground">*</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-border bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-foreground"
                placeholder="8文字以上"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-wide text-muted-foreground">
                パスワード（確認） <span className="text-foreground">*</span>
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-border bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-foreground"
                placeholder="もう一度入力"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="bg-foreground px-12 py-4 text-sm font-medium text-background transition-opacity hover:opacity-50"
              >
                新規作成
              </button>
            </div>

            <p className="pt-2 text-xs text-muted-foreground">
              すでにアカウントをお持ちの方は{" "}
              <Link
                href="/account"
                className="text-foreground underline underline-offset-4"
              >
                ログイン
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
