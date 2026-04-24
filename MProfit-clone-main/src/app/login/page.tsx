'use client';

import React, { useState, MouseEvent } from 'react';
import Link from 'next/link';
import styles from './login.module.css';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
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
      localStorage.setItem('mprofit_user_state', 'existing');
    }
    router.push('/dashboard');
  };

  return (
    <div className={styles.authContainer}>
      {/* Dynamic Background Elements */}
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>

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
              <h2 className={styles.visualTitle}>Unified Wealth. <br /> Infinite Possibilities.</h2>
              <p className={styles.visualSub}>Experience the most advanced portfolio tracking architecture for Indian investors.</p>

              {/* Floating 3D elements inside */}
              <div className={styles.floatingWidget1}></div>
              <div className={styles.floatingWidget2}></div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className={styles.formSide}>
            <div className={styles.formHeader}>
              <h1 className={styles.formTitle}>Welcome Back</h1>
              <p className={styles.formSubtitle}>Log in to access your dashboard</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <input type="email" placeholder="name@example.com" required />
              </div>
              <div className={styles.inputGroup}>
                <div className={styles.labelRow}>
                  <label>Password</label>
                  <Link href="#" className={styles.forgotLink}>Forgot Password?</Link>
                </div>
                <input type="password" placeholder="••••••••" required />
              </div>

              <button type="submit" className={styles.submitBtn}>Log In to MProfit</button>
            </form>

            <div className={styles.authFooter}>
              Don&apos;t have an account? <Link href="/signup" className={styles.authLink}>Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
