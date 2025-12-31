import React from 'react'
import { motion } from 'framer-motion'
import { TiltCard } from './TiltCard'
import team_member_treasure from '../assets/team_member_treasure.png'
import team_member_marcus from '../assets/team_member_marcus.png'

const Team = () => {
    const team = [
        {
            name: "Nleanya Treasure",
            role: "Founder & Visionary",
            image: team_member_treasure,
            color: "from-purple-500 to-indigo-500"
        },
        {
            name: "Marcus Vector",
            role: "Creative Director",
            image: team_member_marcus,
            color: "from-emerald-500 to-teal-500"
        }
    ]

    return (
        <section className='py-24 px-6 md:px-12 lg:px-24 bg-black overflow-hidden'>
            <div className='max-w-7xl mx-auto'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className='text-center mb-20'
                >
                    <h2 className='text-3xl md:text-5xl font-bold text-white mb-6'>
                        Meet The Minds
                    </h2>
                    <p className='text-gray-400 max-w-2xl mx-auto'>
                        The human intelligence behind the artificial one.
                    </p>
                </motion.div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto'>
                    {team.map((member, index) => (
                        <TiltCard
                            key={index}
                            className='relative group cursor-pointer'
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15 }}
                                viewport={{ once: true }}
                                className='relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10'
                            >
                                {/* Image Container */}
                                <div className='relative h-96 w-full overflow-hidden'>
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10`} />

                                    <motion.img
                                        src={member.image}
                                        alt={member.name}
                                        className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                                    />

                                    {/* Abstract Glow Effect */}
                                    <div className={`absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-r ${member.color} blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                                </div>

                                {/* Text Content */}
                                <div className='absolute bottom-0 left-0 w-full p-8 z-20'>
                                    <h3 className='text-2xl font-bold text-white mb-1'>{member.name}</h3>
                                    <p className={`text-transparent bg-clip-text bg-gradient-to-r ${member.color} font-medium tracking-wide uppercase text-xs`}>
                                        {member.role}
                                    </p>
                                </div>

                                {/* Hover Border Shine */}
                                <div className='absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-2xl transition-all duration-300 pointer-events-none' />
                            </motion.div>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Team
