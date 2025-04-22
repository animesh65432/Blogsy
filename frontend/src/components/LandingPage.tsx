import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function LandingPage() {

    return (
        <main className="min-h-screen bg-white text-gray-900">
            <section className="bg-gradient-to-b from-blue-50 to-white py-24 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-blue-700">
                        Welcome to TypeRipple
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 mb-8">
                        A ripple begins with a thought. Share your voice, spark ideas, and connect through writing.
                    </p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <Link href="/signin"> <Button className="px-6 py-3 text-lg">Get Started</Button></Link>
                        <Button variant="outline" className="px-6 py-3 text-lg border-blue-600 text-blue-600 hover:bg-blue-50">
                            Learn More
                        </Button>
                    </div>
                </div>
            </section>

            <section className="py-16 px-6 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-12">Why TypeRipple?</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <Card className="hover:shadow-lg transition">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-2 text-blue-600">Write Freely</h3>
                                <p className="text-gray-600">No distractions, no limits. Just you and your thoughts.</p>
                            </CardContent>
                        </Card>
                        <Card className="hover:shadow-lg transition">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-2 text-blue-600">Grow an Audience</h3>
                                <p className="text-gray-600">Your readers are out there. We help you reach them.</p>
                            </CardContent>
                        </Card>
                        <Card className="hover:shadow-lg transition">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-2 text-blue-600">Beautiful Design</h3>
                                <p className="text-gray-600">Clean layouts that let your words shine.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="bg-blue-50 py-16 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-6">Writers Love TypeRipple</h2>
                    <blockquote className="italic text-gray-700 text-lg">
                        “TypeRipple helped me connect with readers around the world. It’s not just a platform — it's a movement of minds.”
                    </blockquote>
                    <p className="mt-4 font-semibold text-blue-600">— Mira S., Poet & Essayist</p>
                </div>
            </section>

            <footer className="bg-gray-100 py-8 px-6 text-center text-gray-600">
                <p>© {new Date().getFullYear()} TypeRipple. All rights reserved.</p>
                <div className="mt-4 flex justify-center gap-6 text-sm flex-wrap">
                    <a href="#" className="hover:text-blue-600">Privacy</a>
                    <a href="#" className="hover:text-blue-600">Terms</a>
                    <a href="#" className="hover:text-blue-600">Contact</a>
                </div>
            </footer>
        </main>
    )
}
