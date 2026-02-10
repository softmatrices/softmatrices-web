import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Envelope, Phone, PaperPlaneTilt, CheckCircle } from '@phosphor-icons/react'
import { useTheme } from '../context/ThemeContext'

const Contact = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    const { isDark } = useTheme()

    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState({})

    const validate = () => {
        const errs = {}
        if (!formData.name.trim()) errs.name = 'Name is required'
        if (!formData.email.trim()) errs.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Enter a valid email'
        if (!formData.message.trim()) errs.message = 'Message is required'
        return errs
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length > 0) {
            setErrors(errs)
            return
        }
        setErrors({})

        // Web3Forms Integration
        const payload = {
            ...formData,
            access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
        }

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            const result = await res.json()

            if (result.success) {
                setIsSubmitted(true)
                setFormData({ name: '', email: '', message: '' })
                setTimeout(() => setIsSubmitted(false), 5000)
            } else {
                setErrors({ submit: result.message || 'Something went wrong. Please try again.' })
            }
        } catch (error) {
            setErrors({ submit: 'Failed to send message. Please check your connection.' })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    const inputClasses = (hasError) =>
        `w-full px-5 py-4 rounded-xl border-2 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-body text-base ${hasError ? 'border-red-400' : isDark ? 'border-gray-700' : 'border-gray-200'
        } ${isDark ? 'bg-[#141414] text-white placeholder:text-gray-600' : 'bg-gray-50 text-dark placeholder:text-gray-400'}`

    return (
        <section
            ref={ref}
            id="contact"
            className={`py-24 sm:py-32 transition-colors duration-300 ${isDark ? 'bg-[#0A0A0A]' : 'bg-white'}`}
        >
            <div className="section-container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mb-16 sm:mb-24"
                >
                    <span className="text-sm font-medium text-primary uppercase tracking-widest block mb-4">Contact</span>
                    <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.05] mb-6 ${isDark ? 'text-white' : 'text-dark'}`}>
                        Let's build
                        <br />
                        <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>together</span>
                    </h2>
                    <p className={`text-base sm:text-lg max-w-xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Ready to start your next project? We're here to help you transform your business with innovative technology.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Left — Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <h3 className={`text-2xl font-heading font-bold mb-6 ${isDark ? 'text-white' : 'text-dark'}`}>
                            Get in touch
                        </h3>
                        <p className={`text-lg leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            Whether you have a question about our services, need a custom solution, or just want to learn more about how Softmatrices can help — we're ready to listen.
                        </p>

                        <motion.div
                            className={`p-6 rounded-2xl border shadow-sm mb-6 transition-all duration-300 ${isDark ? 'bg-[#1A1A1A] border-gray-800 hover:border-primary/30' : 'bg-white border-gray-200 hover:border-primary/30'}`}
                            whileHover={{ x: 4 }}
                        >
                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Envelope size={20} weight="duotone" className="text-primary" />
                                </div>
                                <div>
                                    <div className={`font-heading font-bold mb-1 ${isDark ? 'text-white' : 'text-dark'}`}>Email Us</div>
                                    <a href="mailto:info@softmatrices.com" className="text-primary hover:text-primary-light transition-colors text-lg font-medium block mb-1">
                                        info@softmatrices.com
                                    </a>
                                    <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>We usually reply within 24 hours</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className={`p-6 rounded-2xl border shadow-sm mb-10 transition-all duration-300 ${isDark ? 'bg-[#1A1A1A] border-gray-800 hover:border-primary/30' : 'bg-white border-gray-200 hover:border-primary/30'}`}
                            whileHover={{ x: 4 }}
                        >
                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Phone size={20} weight="duotone" className="text-primary" />
                                </div>
                                <div>
                                    <div className={`font-heading font-bold mb-1 ${isDark ? 'text-white' : 'text-dark'}`}>Call Us</div>
                                    <a href="tel:+919766476600" className="text-primary hover:text-primary-light transition-colors text-lg font-medium block mb-1">
                                        +91 97664 76600
                                    </a>
                                    <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Mon–Sat, 10 AM – 7 PM IST</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right — Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`rounded-3xl p-10 sm:p-14 text-center h-full min-h-[500px] flex flex-col items-center justify-center border shadow-sm ${isDark ? 'bg-[#141414] border-gray-800' : 'bg-gray-50 border-gray-200'}`}
                            >
                                <motion.div
                                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-green-500/20"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                                >
                                    <CheckCircle size={32} weight="bold" className="text-white" />
                                </motion.div>
                                <h3 className={`text-2xl font-heading font-bold mb-3 ${isDark ? 'text-white' : 'text-dark'}`}>
                                    Message Sent!
                                </h3>
                                <p className="text-gray-500 max-w-xs mx-auto">Thank you for reaching out. We'll get back to you shortly.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className={`p-8 sm:p-10 rounded-3xl border shadow-sm ${isDark ? 'bg-[#141414] border-gray-800' : 'bg-white border-gray-200'}`}>
                                <div className="space-y-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <label htmlFor="name" className={`block text-sm font-bold mb-2.5 ml-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className={inputClasses(errors.name)}
                                        />
                                        {errors.name && <p className="text-red-400 text-sm mt-2 ml-1 font-medium">{errors.name}</p>}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <label htmlFor="email" className={`block text-sm font-bold mb-2.5 ml-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@company.com"
                                            className={inputClasses(errors.email)}
                                        />
                                        {errors.email && <p className="text-red-400 text-sm mt-2 ml-1 font-medium">{errors.email}</p>}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <label htmlFor="message" className={`block text-sm font-bold mb-2.5 ml-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us about your project..."
                                            className={`${inputClasses(errors.message)} resize-none`}
                                        />
                                        {errors.message && <p className="text-red-400 text-sm mt-2 ml-1 font-medium">{errors.message}</p>}
                                    </motion.div>

                                    <motion.button
                                        type="submit"
                                        className={`relative overflow-hidden w-full py-4 rounded-xl font-heading font-bold text-base tracking-wide flex items-center justify-center gap-2 transition-all shadow-lg ${isDark
                                            ? 'bg-white text-dark hover:bg-gray-200 shadow-white/5'
                                            : 'bg-dark text-white hover:bg-gray-800 shadow-dark/10'
                                            }`}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <span className="absolute inset-0 shimmer-effect" />
                                        <span className="relative z-10 flex items-center gap-2">
                                            <PaperPlaneTilt size={18} weight="duotone" />
                                            Send Message
                                        </span>
                                    </motion.button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Contact
