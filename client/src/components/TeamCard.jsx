import React from 'react';
import styled from 'styled-components';

const TeamSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;

  h2 {
    margin-bottom: 2rem;
    font-size: 2rem;
    color: #333;
  }

  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
`;

const Card = styled.div`
  text-align: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.2rem;
    color: #333;
  }

  p {
    font-size: 0.9rem;
    color: #666;
  }
`;

function TeamCard() {
  const teamMembers = [
    { name: 'John Doe', role: 'Head Chef', image: '/images/chef1.jpg' },
    { name: 'Jane Smith', role: 'Sous Chef', image: '/images/chef2.jpg' },
    { name: 'Mike Johnson', role: 'Pastry Chef', image: '/images/chef3.jpg' }
  ];

  return (
    <TeamSection>
      <h2>Our Team</h2>
      <div className="team-grid">
        {teamMembers.map((member) => (
          <Card key={member.name}>
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </Card>
        ))}
      </div>
    </TeamSection>
  );
}

export default TeamCard;