import Link from "next/link";

import { Code, GitBranch } from "lucide-react";
import { Button } from "../ui/button";

export default function Footer() {
    return (
        <div className="border-t text-center w-full mt-24 py-8 flex flex-col gap-12 items-center justify-center">
            <div className="flex flex-col items-center gap-4 px-4">
                <Link className="flex items-center gap-2 max-w-fit mx-auto" href="/" aria-label="Link responsável por redirecionar a Página Home">
                    <Code className="h-6 w-6" />
                    <span className="text-lg font-semibold">Next | React - Projeto Carrinho</span>
                    <span className="sr-only">Link para a página Home</span>
                </Link>
                <Link href={"https://github.com/Santannafe12"} target="_blank">
                    <Button className="flex gap-1">
                        <GitBranch />
                        Github
                    </Button>
                </Link>
            </div>
        </div>
    );
}