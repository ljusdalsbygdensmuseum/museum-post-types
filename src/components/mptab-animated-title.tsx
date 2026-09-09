import { motion } from 'motion/react'

interface Props {
	text: String
}

export function AnimatedTitle({ text }: Props) {
	return (
		<motion.h2
			initial={{ opacity: 0, y: 15 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-20px' }}
		>
			{text}
		</motion.h2>
	)
}
