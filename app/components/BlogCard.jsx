import Link from 'next/link';
import Image from 'next/image';

// Deterministic color class so server and client render the same markup
// (Math.random() during render caused a hydration mismatch).
function categoryColorClass(category, title) {
  if (category === 'Brakery') return '';
  const hash = [...title].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return `color${(hash % 3) + 2}`;
}

export default function BlogCard({ image, category, title, author, date, metaImage, delay }) {
  return (
    <div className="col-lg-6 col-md-6 col-sm-6">
      <div 
        className="single_blog wow fadeInUp" 
        data-wow-delay={delay}
        data-wow-duration="1.1s"
      >
        <div className="blog_thumb">
          <Link href="/blog/lorem-ipsum">
            <Image 
              src={image} 
              alt={title} 
              width={370} 
              height={250} 
              style={{ width: '100%', height: 'auto' }}
            />
          </Link>
        </div>
        <div className="blog_content">
          <div className="blog_arrow_btn">
            <Link href="/blog/lorem-ipsum">
              <i className="ion-arrow-right-c"></i>
            </Link>
          </div>
          <span className={categoryColorClass(category, title)}>{category}</span>
          <h3>
            <Link href="/blog/lorem-ipsum">{title}</Link>
          </h3>
          <div className="blog__meta d-flex align-items-center">
            <div className="blog__meta__thumb">
              <Image src={metaImage} alt={author} width={36} height={36} />
            </div>
            <div className="blog__meta__text">
              <ul className="d-flex">
                <li>By: {author}</li>
                <li><i className="icofont-calendar"></i> {date}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
