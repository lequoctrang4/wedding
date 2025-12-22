# Animation Enhancements

This wedding invitation now features **dynamic entrance animations** powered by **Framer Motion**. Each section animates in with different effects for a more engaging user experience.

## Animation Types

### 1. **Slide Animations**

- **Slide In Left**: Elements slide from left edge (Greeting, Parents - Groom's side)
- **Slide In Right**: Elements slide from right edge (Event Details, Parents - Bride's side)
- **Slide In Top**: Elements slide down from top (Header, Labels)
- **Slide In Bottom**: Elements slide up from bottom (Quote Author, Footer)

### 2. **Scale & Pop Animations**

- **Pop In**: Elements scale up with a spring-like bounce (Gallery Images, Couple Photos)
- **Scale In**: Elements smoothly scale from 80% to 100% (Couple Intro)
- **Bounce Up**: Elements bounce upward with spring easing (Couple Names)

### 3. **Rotation Animation**

- **Rotate In**: Elements rotate and scale in simultaneously (Quote Text)

### 4. **Fade Animation**

- **Fade In**: Pure opacity transition (Base fallback)

## Section-by-Section Breakdown

| Section       | Animation                            | Direction     |
| ------------- | ------------------------------------ | ------------- |
| Header        | Slide In Top (staggered)             | ↓ From Top    |
| Greeting      | Slide In Left                        | ← From Left   |
| Parents       | Left: Slide Left, Right: Slide Right | ↔ Dual        |
| Couple Intro  | Bounce Up + Pop In                   | ⬆ Spring Up   |
| Event Details | Slide In Right (staggered)           | → From Right  |
| Gallery       | Mixed (Pop, Rotate, Bounce)          | Varied        |
| Quote         | Rotate In                            | ↻ Rotate      |
| Footer        | Slide In Bottom (staggered)          | ↑ From Bottom |

## Technical Implementation

- **Library**: Framer Motion v12.23.26
- **Trigger**: `whileInView` — Animations trigger when element enters viewport
- **Timing**: 0.6–0.8s duration with ease-out easing
- **Staggering**: Child elements animate with 0.1–0.2s delays for flowing effect

## Customization

All animations are defined in [src/utils/animations.ts](src/utils/animations.ts). To modify:

1. **Change duration**:

   ```tsx
   hidden: { opacity: 0, x: -100 },
   visible: {
     opacity: 1,
     x: 0,
     transition: { duration: 1.2 }, // Increase from 0.8
   }
   ```

2. **Change stagger delay**:

   ```tsx
   staggerChildren: 0.25, // Increase from 0.15
   ```

3. **Add new animation**:
   ```tsx
   slideInDiagonal: {
     hidden: { opacity: 0, x: -100, y: -60 },
     visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8 } }
   }
   ```

## Performance Notes

- Animations use GPU-accelerated transforms (`x`, `y`, `scale`, `opacity`)
- `once: true` in viewport observer prevents re-triggering animations
- Smooth 60 FPS performance on modern devices
- No impact on Core Web Vitals

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Enjoy the enhanced visual experience! 🎉
