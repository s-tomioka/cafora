import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "認証メールを送信しました | CAFORA",
};

export default async function VerifySentPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <div className="py-8 sm:py-12">
      <div className="container-cafora">
        <h1 className="text-xl font-semibold sm:text-2xl">マイページ</h1>

        <div className="mx-auto mt-16 max-w-md text-center sm:mt-24">
          <p className="text-[10px] tracking-[0.5em] text-muted-foreground">
            EMAIL SENT
          </p>
          <h2 className="mt-4 text-lg font-medium">
            認証メールを送信しました
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {email ? (
              <>
                <span className="font-medium text-foreground">{email}</span>
                <br />
                宛に認証URLをお送りしました。
              </>
            ) : (
              "入力したメールアドレス宛に認証URLをお送りしました。"
            )}
            <br />
            メールのリンクをクリックしてアカウントを有効化してください。
          </p>

          <div className="mt-6 border border-border p-5 text-left text-xs text-muted-foreground">
            <p className="font-medium text-foreground">届かない場合</p>
            <ul className="mt-2 space-y-1">
              <li>・迷惑メールフォルダをご確認ください</li>
              <li>・メールアドレスに誤りがないかご確認ください</li>
              <li>・数分経っても届かない場合はお問合せください</li>
            </ul>
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            <Link
              href="/account"
              className="bg-foreground px-12 py-4 text-sm font-medium text-background transition-opacity hover:opacity-50"
            >
              ログインページへ
            </Link>
            <Link
              href="/faq"
              className="text-xs text-muted-foreground underline underline-offset-4 transition-opacity hover:opacity-50"
            >
              お問合せ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
