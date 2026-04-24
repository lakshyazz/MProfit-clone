'use client';

import React, { useState, MouseEvent } from 'react';
import Link from 'next/link';
// Reuse the incredibly powerful 3D login CSS styles
import styles from '../login/login.module.css';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('mprofit_user_state', 'new');
    }
    router.push('/dashboard');
  };

  return (
    <div className={styles.authContainer}>
      {/* Dynamic Background Elements - Using same orb styles */}
      <div className={styles.orb1} style={{ background: '#9CA3AF', animationDelay: '-5s' }}></div>
      <div className={styles.orb2} style={{ background: 'var(--color-emerald-glow)' }}></div>

      <div className={styles.authWrapper}>
        <div 
          className={styles.authCard}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: rotation.x === 0 && rotation.y === 0 ? 'transform 0.5s ease-out' : 'none'
          }}
        >
          {/* Left Side: 3D Visuals */}
          <div className={styles.visualSide}>
            <div className={styles.visualContent}>
              <h2 className={styles.visualTitle}>Start Your Journey. <br/> Take Control.</h2>
              <p className={styles.visualSub}>Join thousands of top-tier investors already scaling their portfolios with MProfit Next-Gen.</p>
              
              {/* Floating 3D elements inside */}
              <div className={styles.floatingWidget1}></div>
              <div className={styles.floatingWidget2}></div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className={styles.formSide}>
            <div className={styles.formHeader}>
              <h1 className={styles.formTitle}>Create Account</h1>
              <p className={styles.formSubtitle}>Set up your free portfolio tracking in seconds.</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" required />
              </div>
              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <input type="email" placeholder="name@example.com" required />
              </div>
              <div className={styles.inputGroup}>
                <label>Create Password</label>
                <input type="password" placeholder="••••••••" required />
              </div>

              <button type="submit" className={styles.submitBtn}>Join MProfit</button>
            </form>

            <div className={styles.authFooter}>
              Already have an account? <Link href="/login" className={styles.authLink}>Log In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

