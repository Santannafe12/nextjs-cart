import Link from "next/link";
import { TypographyH1, TypographyP } from "../common/typography";
import { Button } from "../ui/button";
import { GitBranch } from "lucide-react";

export default function HeroSection() {
    return (
        <div className="flex flex-col items-center gap-2">
            <section>
                <TypographyH1 className="border-none text-center font-bold">
                    Projeto que simula um carrinhos de compras!
                </TypographyH1>
                <TypographyP className="text-center text-muted-foreground">
                    Projeto desenvolvido com Next.js e com utilização de ContextAPI do React.
                </TypographyP>
            </section>
            <section className="flex flex-wrap justify-center gap-2 items-center">
                <Link href={"/products"}>
                    <Button variant="secondary">
                        Produtos
                    </Button>
                </Link>
                <Link href={"https://github.com/Santannafe12"} target="_blank">
                    <Button className="flex gap-1">
                        <GitBranch />
                        Github
                    </Button>
                </Link>
            </section>
        </div>
    )
}